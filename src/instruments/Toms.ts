import * as Tone from "tone";
import { randomNumberBetween } from "../utils/maths";

export const TOMSPATTERNS = {
  double: [
    { time: "7:2:2", note: "A2", velocity: 0.9 },
    { time: "7:2:3", note: "A3", velocity: 0.7 },
    { time: "7:3:2", note: "A3", velocity: 0.9 },
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
    `http://localhost:3000/sounds/`
  ).toDestination();

  Tone.loaded().then(() => {
    console.log("loaded");
  });

  sampler.volume.value = 4;
} catch (e) {
  console.log("error", e);
}

const play = (measures: number) => {
  const randomN = randomNumberBetween(0, 8);
  if (randomN < 5) return;
  let pattern = randomN === 5 ? TOMSPATTERNS.fast : TOMSPATTERNS.double;

  let part = new Tone.Part(function (time, note) {
    sampler.triggerAttackRelease(note.note, time);
  }, pattern);
  part.loop = measures / 8;
  part.loopEnd = "8:0";
  part.start();
};

const Toms = { play };
export default Toms;
