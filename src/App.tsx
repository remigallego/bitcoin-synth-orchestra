import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Chart from "./components/Chart";
import StartButton from "./components/StartButton";
import { RootState } from "./store";
import * as Tone from "tone";
import { loop } from "./instruments/Loop";

interface Props {}

const App: FunctionComponent<Props> = (props) => {
  const priceData = useSelector((state: RootState) => state.chartData);

  const latestPrice =
    priceData?.data.length > 0
      ? priceData.data[priceData.data.length - 1].priceAsFloat
      : null;

  const priceBeforeLatest =
    priceData?.data.length > 1
      ? priceData.data[priceData.data.length - 2].priceAsFloat
      : null;

  const getColor = () => {
    if (!latestPrice || !priceBeforeLatest) {
      return "white";
    }
    if (latestPrice - priceBeforeLatest > 0) {
      return "#00FF00";
    } else if (latestPrice - priceBeforeLatest < 0) {
      return "#FF0000";
    } else {
      return "white";
    }
  };

  return (
    <>
      <main id="winner">
        <div className="synthwave-grid"></div>
        <h3
          style={{
            position: "absolute",
            fontSize: 50,
            opacity: 0.5,
            color: getColor(),
          }}
        >
          {loop?.progress > 0 && latestPrice}
        </h3>
      </main>
      {loop?.progress > 0 && (
        <>
          <Chart data={priceData.data} />
        </>
      )}
      <StartButton data={priceData.data} />

      {/*    <div
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
        </div> */}
    </>
  );
};

export default App;
