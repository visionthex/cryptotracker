import "./App.css";
import CoinTable from "./Components/coinTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { PriceAlertModal, fetchCurrentPrice } from "./Components/Alerts";
import SelectCoinForm from "./Components/SelectCoinForm";
import NavBar from "./Components/NavBar";
import Paper from "@mui/material/Paper";
import AlertsList from "./Components/AlertsList";

const App = () => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showAlertsList, setShowAlertsList] = useState(false);
  const [showModal, setShowModal] = useState(false); // Added
  const [alertCoin, setAlertCoin] = useState(null); // Added

  const toggleAlertsList = () => {
    setShowAlertsList(!showAlertsList)
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const checkPrices = async () => {
      for (let coin of selectedCoins) {
        const currentPrice = await fetchCurrentPrice(coin.id);
        if (currentPrice && currentPrice <= coin.targetPrice) {
          setActiveAlerts(prevAlerts => [...prevAlerts, { ...coin, currentPrice }]);
          setAlertCoin(coin); // Added
          setShowModal(true); // Added
          break;  // Exit loop after triggering one alert
        }
      }
    };

    const interval = setInterval(checkPrices, 10000);  // Check every 10 seconds
    return () => clearInterval(interval);
  }, [selectedCoins]);

  const addCoinAlert = (coin) => {
    setSelectedCoins(prevCoins => [...prevCoins, { ...coin, targetPrice: parseFloat(coin.targetPrice) }]);
  };

  const handleCloseModal = () => { // Renamed from handleCloseAlert
    setShowModal(false);  // Close the modal
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/cryptotracker">
        <Box
          className="App"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <NavBar
            onNotificationClick={toggleAlertsList}
            notificationCount={activeAlerts.length}
            darkMode={darkMode}
            handleThemeChange={handleThemeChange}
            search={search}
            setSearch={setSearch}
          />
          <Paper elevation={3}>
            <img
              src="/VJi.gif"
              alt="Banner"
              style={{ width: "100%", height: "400px" }}
            />
          </Paper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div style={{ marginTop: "20px" }}>
                    <SelectCoinForm onAddCoin={addCoinAlert} />
                    {showModal && (
                      <PriceAlertModal
                        coin={alertCoin}
                        onClose={handleCloseModal}
                      />
                    )}
                    {showAlertsList && (
                      <AlertsList
                        alerts={activeAlerts}
                        onClose={() => setShowAlertsList(false)}
                      />
                    )}
                    <CoinTable search={search} />
                  </div>
                </>
              }
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );

};

export default App;
