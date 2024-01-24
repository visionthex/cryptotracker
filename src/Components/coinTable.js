import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CoinChart from "./CoinChart";

// CoinTable component
const CoinTable = ({ search = "" }) => {
  const [selectionModel, setSelectionModel] = useState([]); // Updated state variable
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [open, setOpen] = useState(false);
  const [coinData, setCoinData] = useState([]);

  // This is the search filter for the table
  const filteredCoinData = coinData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      (`$${coin.price_usd}` && `$${coin.price_usd}`.includes(search)) ||
      (coin.price_btc && coin.price_btc.toString().includes(search)) ||
      (coin.tsupply && coin.tsupply.toString().includes(search)),
  );

  // This is the call back funcation for the checkbox and catch for if the user selects more than 10 coins
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      if (selectedCoins.length < 10) {
        setSelectedCoins((prevCoins) => [...prevCoins, id]);
      } else {
        alert("You cannot select more than 10 coins.");
      }
    } else {
      setSelectedCoins((prevCoins) =>
        prevCoins.filter((coinId) => coinId !== id),
      );
      setSelectedAll(false);
    }
  };

  // This is a catch for if the user does not select any coins
  const handleOpen = () => {
    if (selectedCoins.length === 0) {
      alert("You must select at least one coin.");
    } else {
      setOpen(true);
    }
  };

  // Dialog Close button to close out of the dialog box
  const handleClose = () => {
    setOpen(false);
  };

// This function is used to add commas to the numbers
function formatNumber(num, precision) {
  if (num === null || num === undefined) {
    return 'N/A';
  }

  let [whole, fraction] = num.toString().split(".");
  if (!fraction) return num.toString();
  let nonZeroIndex = Array.from(fraction).findIndex((char) => char !== "0");
  if (nonZeroIndex >= precision) {
    let significantFraction = fraction.slice(0, nonZeroIndex + 2);
    return `${whole}.${parseFloat(significantFraction)}`;
  } else {
    return Number(num)
      .toFixed(10)
      .replace(/\.?0+$/, "");
  }
}

  // This funcation is used to make sure the price is formatted correctly
  function formatPrice(price) {
    let precision = 2;
    while (price < 0.01 && precision < 20) {
      price *= 10;
      precision++;
    }
    return Number(price.toFixed(precision)).toLocaleString("en-US", {
      minimumFractionDigits: precision,
    });
  }

  // The funcation is used to colorize the datapoint for the percentage coming from the API "24h and 7d"
  function colorizePercentage(percentage) {
    const number = Number(percentage);
    if (isNaN(number)) {
      return percentage;
    }
    const color = number >= 0 ? "green" : "red";
    return <span style={{ color: color }}>{percentage}%</span>;
  }

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coinlore.net/api/tickers/");
        const apiData = await response.json();
        setCoinData(apiData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [search]);

  // This is where you can add or remove items from the DataGrid here
  const columns = [
    {
      field: "select",
      headerName: "Select",
      flex: 1,
      headerAlign: "center",
      renderHeader: (params) => (
        <Checkbox
          checked={selectedAll}
          onChange={(event) => {
            setSelectedAll(event.target.checked);
            if (event.target.checked) {
              setSelectedCoins(coinData.slice(0, 10).map((coin) => coin.id));
              if (coinData.length > 10) {
                alert("You cannot select more than 10 coins.");
              }
            } else {
              setSelectedCoins([]);
            }
          }}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedCoins.includes(params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row.id)}
          sx={{ "& .MuiSvgIcon-root": { height: "30px", width: "30px" } }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "symbol", headerName: "Symbol", flex: 1 },
    {
      field: "percent_change_24h",
      headerName: "24h Change",
      flex: 1,
      renderCell: (params) =>
        colorizePercentage(formatNumber(Number(params.value), 2)),
    },
    {
      field: "percent_change_7d",
      headerName: "7d Change",
      flex: 1,
      renderCell: (params) =>
        colorizePercentage(formatNumber(Number(params.value), 2)),
    },
    { field: "price_btc", headerName: "Price BTC", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "totalsupply", headerName: "Total Supply", flex: 1 },
  ];

  // This is where you can add items to the DataGrid and name them related to the API data.
  const rows = filteredCoinData.map((individualCoinDataItem) => ({
    id: individualCoinDataItem.id,
    rank: individualCoinDataItem.rank,
    name: individualCoinDataItem.name,
    symbol: individualCoinDataItem.symbol,
    percent_change_24h: formatNumber(
      Number(individualCoinDataItem.percent_change_24h),
      2,
    ),
    percent_change_7d: formatNumber(
      Number(individualCoinDataItem.percent_change_7d),
      2,
    ),
    price_btc: formatNumber(Number(individualCoinDataItem.price_btc), 2),
    price: `$${formatPrice(Number(individualCoinDataItem.price_usd))}`,
    totalsupply: `${Math.ceil(Number(individualCoinDataItem.tsupply)).toLocaleString()} ${individualCoinDataItem.symbol}`,
  }));

  function formatCoinPrice(price) {
    let decimalPlaces = 2;
    if (price < 1) {
        while (price < 1) {
            decimalPlaces++;
            price *= 10;
        }
    }
    price = (price / Math.pow(10, decimalPlaces - 2));
    return price.toLocaleString('en-US', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces});
}
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* You are able to add or remove items from the DataGrid here */}
      <DataGrid
        rows={rows}
        columns={columns}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) =>
          setSelectionModel(newSelectionModel)
        }
      />
      <Button onClick={handleOpen}>Open Dialog</Button>

      {/* This is the Dialog box the will diplay the selected coins */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Selected Coins</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {selectedCoins.map((id) => {
              const coin = coinData.find((coin) => coin.id === id);
              return (
                <div
  key={coin.id}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0"
  }}
>
  <div style={{ marginRight: "50px" }}>
    <p style={{display: 'inline-block', marginRight: '10px', fontWeight: '600'}}>{coin.name}</p>
    <p style={{display: 'inline-block', fontSize: 'small'}}>{coin.symbol}</p>
      <div style={{display: 'flex', alignItems: 'center', marginTop: '-30px', marginBottom: '10px'}}>
      <h2 style={{marginRight: '10px'}}>
        ${formatCoinPrice(Number(coin.price_usd))}
      </h2>
        <p style={{display: 'inline-block', fontSize: 'small', color: coin.percent_change_24h < 0 ? 'red' : 'green', fontWeight: '600'}}>
          {coin.percent_change_24h < 0 ? '↓' : '↑'} {coin.percent_change_24h}% (1d)
        </p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Market cap:</p>
        <p style={{display: 'inline-block', fontSize: 'small', color: coin.percent_change_24h < 0 ? 'red' : 'green', marginRight: '10px', fontWeight: '600'}}>
          {coin.percent_change_24h < 0 ? '↓' : '↑'} {coin.percent_change_24h}%
        </p>
        <p style={{fontWeight: '600'}}>${Math.floor(coin.market_cap_usd).toLocaleString()}</p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
  <p style={{marginRight: '10px'}}>Volume (24h):</p>
  <p style={{display: 'inline-block', fontSize: 'small', color: (coin.market_cap_usd / coin.volume24) < 1 ? 'red' : 'green', marginRight: '10px', fontWeight: '600'}}>
    {(coin.market_cap_usd / coin.volume24) < 1 ? '↓' : '↑'} {((coin.market_cap_usd / coin.volume24) * 100).toFixed(2)}%
  </p>
  <p style={{fontWeight: '600'}}>${Math.floor(coin.volume24).toLocaleString()}</p>
</div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Volume/Market cap (24h):</p>
        <p style={{fontWeight: '600'}}>{((coin.volume24 / coin.market_cap_usd) * 100).toFixed(2)}%</p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Circulating supply:</p>
        <p style={{fontWeight: '600'}}>{Math.floor(coin.csupply).toLocaleString()} {coin.symbol}</p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Total supply:</p>
        <p style={{fontWeight: '600'}}>{Math.floor(coin.tsupply).toLocaleString()} {coin.symbol}</p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Max supply:</p>
        <p style={{fontWeight: '600'}}>{Math.floor(coin.msupply).toLocaleString()} {coin.symbol}</p>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '10px'}}>Fully diluted market cap:</p>
        <p style={{fontWeight: '600'}}>
          ${Math.floor(coin.msupply * coin.price_usd).toLocaleString()}
        </p>
    </div>
  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CoinChart coinId={coin.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>

        {/* Close button for dialog box */}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoinTable;
