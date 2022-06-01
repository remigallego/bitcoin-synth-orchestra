import React from "react";
import * as d3 from "d3";
import classNames from "classnames";

interface Props {
  bar: {
    price: number;
  };
  previousBar: {
    price: number;
  };
  x: number;
  candleWidth: number;
  pixelFor: (d: number) => number;
  height: number;
  chartHeight: number;
}

const Candle = (props: Props) => {
  const { bar, x, candleWidth, pixelFor } = props;

  const deltaWithPrevious = bar.price - props.previousBar?.price;
  const isBuyCandle = deltaWithPrevious > 0;

  const barTop = pixelFor(bar.price);

  const getHeightPercentage = () => {
    if (props.height < 1) {
      return 1;
    }
    return props.height;
  };

  return (
    <>
      <rect
        x={x - candleWidth / 2}
        y={
          isBuyCandle
            ? barTop
            : barTop - (props.chartHeight * getHeightPercentage()) / 100
        }
        width={candleWidth}
        height={`${getHeightPercentage()}%`}
        className={classNames({
          candle: true,
          up: isBuyCandle,
          down: !isBuyCandle,
        })}
      />
    </>
  );
};

export default Candle;
