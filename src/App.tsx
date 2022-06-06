import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./components/Chart";
import Synth from "./components/Synth";
import { RootState } from "./store";
import debug, { actions } from "./store/debug";

interface Props {}

const App: FunctionComponent<Props> = (props) => {
  const [devMode, setDevMode] = React.useState(false);
  const priceData = useSelector((state: RootState) => state.chartData);
  const direction = useSelector(
    (state: RootState) => state.musicVariables.direction
  );
  const dispatch = useDispatch();

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
      {!devMode && (
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
              {latestPrice}
            </h3>
          </main>

          <Chart data={priceData.data} />
        </>
      )}

      <Synth data={priceData.data} />
      <button
        style={{ zIndex: 100 }}
        onClick={() => {
          setDevMode(!devMode);
        }}
      >
        dev mode
      </button>
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
