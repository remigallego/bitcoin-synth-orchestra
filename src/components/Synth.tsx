import React, { FunctionComponent } from "react";
import { PriceData } from "../context/PriceDataContext";
import * as Tone from "tone";
import { neutralPattern, regenerateNeutralPattern } from "../synth";

import Loop from "../instruments/Loop";
interface Props {
  data: PriceData["data"];
}
// Tone.Transport.bpm.value = 150;

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

      <button
        onClick={() => {
          regenerateNeutralPattern();
          neutralPattern.start(0);
        }}
      >
        Regenerate neutral
      </button>
    </div>
  );
};

export default Synth;
