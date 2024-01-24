import React from "react";

export async function fetchCurrentPrice(coinId) {
  try {
    const response = await fetch(
      `https://api.coinlore.net/api/ticker/?id=${coinId}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0].price_usd;
  } catch (error) {
    console.error("Error fetching current price:", error);
    return null;
  }
}

export const PriceAlertModal = ({ coin, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Price Alert</h2>
        <p>{coin.name} has reached your target price of ${coin.targetPrice}.</p>
        <p>Current Price: ${coin.currentPrice}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

