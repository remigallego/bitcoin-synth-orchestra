import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";

export const KICKPATTERNS = {
  straight: [
    { time: "0:0:0" },
    { time: "0:1:0" },
    { time: "0:2:0" },
    { time: "0:3:0" },
  ],
  double: [
    { time: "0:0:0" },
    { time: "0:1:0" },
    { time: "0:1:2" },
    { time: "0:2:0" },
    { time: "0:3:0" },
  ],
  dnb: [{ time: "0:0:0" }, { time: "0:2:2" }],
  dubstep: [{ time: "0:0:0" }, { time: "0:1:2" }],
};

let kickDrum = new Tone.MembraneSynth({ volume: 15 }).toDestination();
let currentPart: Tone.Part;

const play = (measures: number) => {
  const direction = store.getState().musicVariables.direction;
  const randomNumber = randomNumberBetween(0, 5);
  let pattern = KICKPATTERNS.straight;

  if (direction === -1) {
    pattern = KICKPATTERNS.dnb;
  } else if (direction === 1) {
    pattern = KICKPATTERNS.straight;
  } else if (direction === 0) {
    pattern = KICKPATTERNS.dubstep;
  }

  currentPart = new Tone.Part(function (time) {
    kickDrum.triggerAttackRelease("C1", "16n", time);
  }, pattern);
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start();
};

const Kick = { play };
export default Kick;
