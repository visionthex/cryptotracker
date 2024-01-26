import React, { useState, useEffect } from "react";
import { VictoryArea, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import axios from "axios";

const CoinChart = ({ coinId }) => {
  const [positiveData, setPositiveData] = useState([]);
  const [negativeData, setNegativeData] = useState([]);

  useEffect(() => {
    const fetchCoinData = () => {
      axios
        .get(`https://api.coinlore.net/api/coin/markets/?id=${coinId}`)
        .then((response) => {
          if (response.data.length === 0) {
            // API did not return any data
            setPositiveData([]);
            setNegativeData([]);
            return;
          }

          const positiveData = [];
          const negativeData = [];

          response.data.forEach((item) => {
            const value = parseFloat(item.price_usd);
            const dataItem = { name: item.time, value };

            if (value >= 0) {
              positiveData.push(dataItem);
            } else {
              negativeData.push(dataItem);
            }
          });

          setPositiveData(positiveData);
          setNegativeData(negativeData);
        })
        .catch((error) => {
          console.error(error);
          // Handle errors in fetching data
          setPositiveData([]);
          setNegativeData([]);
        });
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 10000);
    return () => clearInterval(interval); // cleanup on unmount
  }, [coinId]); // re-run effect when coinId changes

  // Calculate min and max values
  const allValues = [...positiveData, ...negativeData].map(item => item.value);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const adjustedMinValue = minValue - (0.1 * Math.abs(minValue));

  return (
    <div>
        {/* This is where you can adjust the charts values as needed */}
        <VictoryChart
          theme={VictoryTheme.material}
          width={800}
          height={400}
          padding={{ top: 20, bottom: 60, left: 60, right: 20 }}
          domain={{ y: [adjustedMinValue, maxValue] }}
        >
          <VictoryAxis
            label="Time"
            style={{
              axisLabel: { padding: 50 }
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Price (USD)"
            style={{
              axisLabel: { padding: 50 }
            }}
          />

          {/* This will change the color of the chart under the line to red or green depending on the value */}
          <VictoryArea
            data={positiveData}
            x="name"
            y="value"
            style={{ data: { fill: "green", stroke: "green", fillOpacity: 0.3 } }} // Fill the area under the line
          />
          <VictoryArea
            data={negativeData}
            x="name"
            y="value"
            style={{ data: { fill: "red", stroke: "red", fillOpacity: 0.3 } }} // Fill the area under the line
          />
        </VictoryChart>
      </div>
  );
};

export default CoinChart;