import React, { FunctionComponent, useState } from "react";
import * as d3 from "d3";

import { PriceData } from "../context/PriceDataContext";
import Candle from "./Candle";

interface Props {
  data: PriceData["data"];
}

const Chart: FunctionComponent<Props> = (props) => {
  const chartWidth = window.window.innerWidth;
  const chartHeight = window.window.innerHeight;

  const dataAsFloat = props.data.map((d, i) => {
    return {
      price: parseFloat(d.price),
    };
  });

  if (!dataAsFloat) {
    return <h1>No data</h1>;
  }

  const highestPrice = (d3.max(dataAsFloat.map((bar) => bar.price)) ?? 0) + 0.5;
  const lowestPrice = (d3.min(dataAsFloat.map((bar) => bar.price)) ?? 0) - 0.5;
  const lowestToHighestDelta = highestPrice - lowestPrice;

  const pixelFor = (price: number) => {
    return Math.abs(
      ((price - lowestPrice) / lowestToHighestDelta) * chartHeight - chartHeight
    );
  };

  // calculate the candle width
  const candleWidth = Math.floor((chartWidth / dataAsFloat.length) * 0.8);

  return (
    <svg width={chartWidth} height={chartHeight} className="chart">
      {dataAsFloat.map((bar, i) => {
        const xPosition = (chartWidth / (dataAsFloat.length + 1)) * (i + 1);
        const previousBar = dataAsFloat[i - 1];
        let diff = 0;
        if (previousBar) {
          diff = bar.price - previousBar.price;
        }
        const calculateHeight = () => {
          return Math.abs((diff * 100) / lowestToHighestDelta);
        };
        return (
          <Candle
            key={i}
            bar={bar}
            previousBar={previousBar}
            x={xPosition}
            candleWidth={candleWidth}
            pixelFor={pixelFor}
            height={calculateHeight()}
            chartHeight={chartHeight}
          />
        );
      })}
    </svg>
  );
};

export default Chart;
