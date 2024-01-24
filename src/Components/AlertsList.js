import React from "react";

const AlertsList = ({ alerts, onClose }) => {
  return (
    <div className="alerts-list">
      <button onClick={onClose}>Close</button>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            {alert.name} reached target price of ${alert.targetPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
