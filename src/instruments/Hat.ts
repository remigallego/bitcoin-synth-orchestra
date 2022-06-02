import * as Tone from "tone";
import { randomNumberBetween } from "../utils/maths";

const HATPATTERNS = {
  straight: [
    { time: "0:0:2" },
    { time: "0:1:2" },
    { time: "0:2:2" },
    { time: "0:3:2" },
  ],
  fast: [
    { time: "0:0:1" },
    { time: "0:0:2" },
    { time: "0:0:3" },
    { time: "0:1:1" },
    { time: "0:1:2" },
    { time: "0:1:3" },
    { time: "0:2:1" },
    { time: "0:2:2" },
    { time: "0:2:3" },
    { time: "0:3:1" },
    { time: "0:3:2" },
    { time: "0:3:3" },
  ],
};

export const hatDrum = new Tone.NoiseSynth({
  volume: 2,
  noise: {
    type: "pink",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.02,
    decay: 0.02,
    sustain: 0.02,
    release: 0,
  },
}).chain(
  new Tone.Filter({ frequency: 10000, type: "highpass" }),
  Tone.Destination
);
let currentPart: Tone.Part;

const play = (measures: number) => {
  const randomNumber = randomNumberBetween(0, 5);
  let pattern = HATPATTERNS.straight;
  if (randomNumber === 5) {
    pattern = HATPATTERNS.fast;
  }
  currentPart = new Tone.Part(function (time) {
    hatDrum.triggerAttackRelease("16n", time);
  }, pattern);
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start();
};

const Hat = { play };
export default Hat;
