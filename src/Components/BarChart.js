import React, { useState, useEffect } from "react";
import {
  LineChart,
  Label,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Dot,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import axios from "axios";

// Customized legend component
const CustomizedLegend = () => (
  <div>
    <span style={{ color: 'green' }}>• Value Increase</span><br/>
    <span style={{ color: 'red' }}>• Value Decrease</span>
  </div>
);

// Customized dot component
const CustomizedDot = ({ cx, cy, payload }) => {
  let fill;
  if (payload.value > 0) {
    fill = "green";
  } else if (payload.value < 0) {
    fill = "red";
  } else {
    fill = "#8884d8";
  }

  return <Dot cx={cx} cy={cy} r={6} fill={fill} />;
};

// Bar chart component
const BarChart = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://api.coinlore.net/api/tickers/")
      .then((response) => {
        const data = response.data.data
          .map((item) => ({
            name: item.name,
            value: parseFloat(item.percent_change_24h),
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
        setData(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <h2>Top Ten Cryptocurrency Values</h2>
      <ResponsiveContainer width='100%' height='90%'>
        <LineChart
          width={1000}
          height={600}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Cryptocurrency" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Value Change (%)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend content={<CustomizedLegend />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={<CustomizedDot />}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;