import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Chart from "./components/Chart";
import StartButton from "./components/StartButton";
import { RootState } from "./store";
import { loop } from "./instruments/SongLoop";

interface Props {}

const App: FunctionComponent<Props> = (props) => {
  const priceData = useSelector((state: RootState) => state.chartData);
  const direction = useSelector(
    (state: RootState) => state.musicVariables.direction
  );

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
      <div id="video-wrap">
        <video id="video" loop autoPlay>
          <source src="/videos/bg.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      {loop?.progress > 0 && (
        <main id="winner">
          <h3
            style={{
              position: "absolute",
              fontSize: 70,
              color: getColor(),
            }}
          >
            <div
              className="chrome80s centered"
              data-text={loop?.progress > 0 && latestPrice}
            >
              {loop?.progress > 0 && latestPrice}
            </div>
            {/* 
            // WIP: Adds a blinking "Pump" or "Dump" text depending on the direction
            {direction === 1 && (
              <h1
                style={{
                  position: "absolute",
                  top: 30,
                  fontSize: "3vw",
                }}
              >
                Pump!
              </h1>
            )} */}
          </h3>
        </main>
      )}

      {loop?.progress > 0 && (
        <>
          <Chart data={priceData.data} />
        </>
      )}
      <StartButton />
      <a
        href="https://github.com/remigallego/bitcoin-synth-orchestra"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="./github.png"
          alt="github logo"
          className="github-logo"
          style={{
            height: 50,
            width: 50,
            position: "absolute",
            bottom: 35,
            right: 35,
          }}
        />
      </a>
    </>
  );
};

export default App;
