import React, { FunctionComponent } from "react";
import { PriceData } from "../context/PriceDataContext";
import * as Tone from "tone";

import Loop from "../instruments/Loop";
interface Props {
  data: PriceData["data"];
}
export const DEFAULT_BPM = 140;

const Synth: FunctionComponent<Props> = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
      }}
    >
      <button
        onClick={() => {
          Tone.start();

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
