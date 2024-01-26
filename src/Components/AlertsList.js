import React from "react";

const AlertsList = ({ alerts, onClose }) => {
  return (
    <div className="alerts-list">
      <button onClick={onClose}>Close</button>
      <ul>
        {alerts.map(({ name, targetPrice }, index) => (
          <li key={index}>
            {name} reached target price of ${targetPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;