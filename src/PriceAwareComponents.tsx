import React, { FunctionComponent, useContext } from "react";
import Chart from "./components/Chart";
import Synth from "./components/Synth";
import PriceDataContext from "./context/PriceDataContext";

interface Props {}

const PriceAwareComponents: FunctionComponent<Props> = (props) => {
  const priceData = useContext(PriceDataContext);

  const latestPrice =
    priceData?.data.length > 0
      ? priceData.data[priceData.data.length - 1]
      : null;

  return (
    <>
      <h1
        style={{
          position: "absolute",
          opacity: 0.4,
          color: latestPrice?.price === "Buy" ? "white" : "white",
        }}
      >
        {latestPrice?.price}
      </h1>
      <Chart data={priceData.data} />
      <Synth data={priceData.data} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "white",
        }}
      >
        <button onClick={() => priceData.debugPriceGoUp()}>
          Make price go up
        </button>
        <button onClick={() => priceData.debugPriceGoDown()}>
          Make price go down
        </button>
        <button onClick={() => priceData.setPause()}>
          Pause
        </button>
      </div>
    </>
  );
};

export default PriceAwareComponents;
