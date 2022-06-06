import React, { FunctionComponent } from "react";
import { PriceData } from "../context/PriceDataContext";
import * as Tone from "tone";

import Loop, { loop } from "../instruments/Loop";
import { actions } from "../store/chartData";
import { useDispatch } from "react-redux";
interface Props {
  data: PriceData["data"];
}
export const DEFAULT_BPM = 140;

const StartButton: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();

  const getText = () => {
    if (Tone.Transport.state === "stopped") {
      return "Start";
    }
    if (Tone.Transport.state === "started" && !loop?.progress) {
      return "Loading sounds...";
    }
  };

  const hideButton = Tone.Transport.state === "started" && loop?.progress > 0;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 999,
        marginBottom: 40,
      }}
    >
      {!hideButton && (
        <button
          disabled={Tone.Transport.state === "started"}
          style={{}}
          onClick={() => {
            if (Tone.Transport.state === "stopped") {
              Tone.start();
              dispatch(actions.startChart());
              Tone.Destination.volume.value = -14;
              Tone.Transport.bpm.value = DEFAULT_BPM;

              Tone.Transport.start();
              Loop.startLoop();
            }
          }}
        >
          {getText()}
        </button>
      )}
    </div>
  );
};

export default StartButton;
