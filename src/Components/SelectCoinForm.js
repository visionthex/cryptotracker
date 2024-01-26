import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Box, Grid } from "@mui/material";

const SelectCoinForm = ({ onAddCoin }) => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [targetPrice, setTargetPrice] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("https://api.coinlore.net/api/tickers/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoins(data.data); // Set the fetched coins
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCoin) {
      onAddCoin({
        id: selectedCoin.id,
        name: selectedCoin.name,
        targetPrice: parseFloat(targetPrice),
      });
    }
    // Reset form
    setSelectedCoin(null);
    setTargetPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete
              value={selectedCoin}
              onChange={(event, newValue) => {
                setSelectedCoin(newValue);
              }}
              options={coins}
              getOptionLabel={({ name }) => name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Coin"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              value={targetPrice}
              onChange={({ target: { value } }) => setTargetPrice(value)}
              label="Target Price"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ height: "100%" }}
            >
              Set Alert
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default SelectCoinForm;