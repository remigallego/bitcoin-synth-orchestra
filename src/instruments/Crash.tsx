import * as Tone from "tone";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./SongLoop";

const HATPATTERNS = {
  straight: [{ time: "0:0:0" }],
  fast: [
    { time: "0:0:1", velocity: 0.9 },
    { time: "0:0:2", velocity: 1 },
    { time: "0:0:3", velocity: 0.9 },
    { time: "0:1:1", velocity: 0.9 },
    { time: "0:1:2", velocity: 1 },
    { time: "0:1:3", velocity: 0.9 },
    { time: "0:2:1", velocity: 0.9 },
    { time: "0:2:2", velocity: 1 },
    { time: "0:2:3", velocity: 0.9 },
    { time: "0:3:1", velocity: 0.9 },
    { time: "0:3:2", velocity: 1 },
    { time: "0:3:3", velocity: 0.9 },
  ],
};

export const hatDrum = new Tone.NoiseSynth({
  volume: 2,
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.02,
    decay: 0.6,
    sustain: 0.2,
    release: 0.7,
  },
}).chain(
  new Tone.Filter({ frequency: 10000, type: "highpass" }),
  Tone.Destination
);
let currentPart: Tone.Part;

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;
  let pattern = HATPATTERNS.straight;
  
  currentPart = new Tone.Part(function (time) {
    hatDrum.triggerAttackRelease("1n", time);
  }, pattern);
  currentPart.loop = measures / 8;
  currentPart.loopEnd = "8:0";
  currentPart.start(startTime);
};

const Crash = { play };
export default Crash;
