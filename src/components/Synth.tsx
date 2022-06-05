import React, { FunctionComponent } from "react";
import { PriceData } from "../context/PriceDataContext";
import * as Tone from "tone";

import Loop from "../instruments/Loop";
import { actions } from "../store/chartData";
import { useDispatch } from "react-redux";
interface Props {
  data: PriceData["data"];
}
export const DEFAULT_BPM = 140;

const Synth: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 999,
        marginBottom: 40,
      }}
    >
      <button
        style={{}}
        onClick={() => {
          Tone.start();

          dispatch(actions.startChart());

          Tone.Destination.volume.value = -14;
          Tone.Transport.bpm.value = DEFAULT_BPM;

          if (Tone.Transport.state !== "started") {
            Tone.Transport.start();
            Loop.startLoop();
          } else {
            Tone.Transport.stop();
          }
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Synth;
