import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./components/Chart";
import Synth from "./components/Synth";
import { RootState } from "./store";
import debug, { actions } from "./store/debug";

interface Props {}

const PriceAwareComponents: FunctionComponent<Props> = (props) => {
  const priceData = useSelector((state: RootState) => state.chartData);
  const musicVars = useSelector((state: RootState) => state.musicVariables);
  const dispatch = useDispatch();

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
        <p style={{ fontSize: 15, color: "black", margin: 0 }}>
          Direction: {musicVars.direction.toString()}
        </p>
        <button onClick={() => dispatch(actions.setPriceOffsetUp())}>
          Make price go UP
        </button>{" "}
        <button onClick={() => dispatch(actions.setPriceOffsetDown())}>
          Make price go DOWN
        </button>
      </div>
    </>
  );
};

export default PriceAwareComponents;
