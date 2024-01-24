import React from "react";
import { VictoryArea, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import axios from "axios";

class CoinChart extends React.Component {
  state = {
    positiveData: [],
    negativeData: [],
  };

  fetchCoinData = () => {
    axios
      .get(`https://api.coinlore.net/api/coin/markets/?id=${this.props.coinId}`)
      .then((response) => {
        if (response.data.length === 0) {
          // API did not return any data
          this.setState({ positiveData: [], negativeData: [] });
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

        this.setState({ positiveData, negativeData });
      })
      .catch((error) => {
        console.error(error);
        // Handle errors in fetching data
        this.setState({ positiveData: [], negativeData: [] });
      });
  };

  componentDidMount() {
    this.fetchCoinData();
    this.interval = setInterval(this.fetchCoinData, 10000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.coinId !== prevProps.coinId) {
      this.fetchCoinData();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // Calculate min and max values
    const allValues = [...this.state.positiveData, ...this.state.negativeData].map(item => item.value);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const adjustedMinValue = minValue - (0.1 * Math.abs(minValue));

    return (
    <div>
        {/* This is where you can adjust he charts values as needed */}
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
            data={this.state.positiveData}
            x="name"
            y="value"
            style={{ data: { fill: "green", stroke: "green", fillOpacity: 0.3 } }} // Fill the area under the line
          />
          <VictoryArea
            data={this.state.negativeData}
            x="name"
            y="value"
            style={{ data: { fill: "red", stroke: "red", fillOpacity: 0.3 } }} // Fill the area under the line
          />
        </VictoryChart>
      </div>
    );
  }
}

export default CoinChart;