import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./Loop";

export const TOMSPATTERNS = {
  double: [
    { time: "7:2:2", note: "A2", velocity: 0.9 },
    { time: "7:2:3", note: "A3", velocity: 0.7 },
    { time: "7:3:1", note: "A3", velocity: 0.7 },
    { time: "7:3:2", note: "A4", velocity: 0.9 },
    { time: "7:3:3", note: "A4", velocity: 0.7 },
  ],
  fast: [
    { time: "7:2:1", note: "A2", velocity: 0.7 },
    { time: "7:2:2", note: "A2", velocity: 0.9 },
    { time: "7:2:3", note: "A3", velocity: 0.7 },
    { time: "7:3:0", note: "A3", velocity: 0.7 },
    { time: "7:3:1", note: "A3", velocity: 0.7 },
    { time: "7:3:2", note: "A4", velocity: 0.9 },
    { time: "7:3:3", note: "A4", velocity: 0.7 },
  ],
};

let sampler = new Tone.Sampler();
try {
  sampler = new Tone.Sampler(
    {
      A2: "tom1.wav",
      A3: "tom2.wav",
      A4: "tom3.wav",
    },
    () => {},
    `${window.location.href}sounds/`
  ).toDestination();

  Tone.loaded().then(() => {
    console.log("loaded");
  });

  sampler.volume.value = 4;
} catch (e) {
  console.log("error", e);
}

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;
  const direction = store.getState().musicVariables.direction;
  let pattern = TOMSPATTERNS.double;

  if (direction === 1) {
    pattern = TOMSPATTERNS.fast;
  }

  let part = new Tone.Part(function (time, note) {
    sampler.triggerAttackRelease(note.note, "16n", time);
  }, pattern);
  part.loop = measures / 8;
  part.loopEnd = "8:0";
  part.start(startTime);
};

const Toms = { play };
export default Toms;
