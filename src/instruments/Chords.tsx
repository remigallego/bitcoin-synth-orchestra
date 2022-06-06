import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./Loop";

let sampler = new Tone.Sampler();
try {
  sampler = new Tone.Sampler(
    {
      A0: "lowlead.wav",
      A1: "lowpad.wav",
      A2: "arp.wav",
      A3: "chordloop.wav",
    },
    () => {},
    `${window.location.href}sounds/`
  ).toDestination();

  Tone.loaded().then(() => {
    console.log("loaded CHORDS");
  });

  sampler.volume.value = 7;
} catch (e) {
  console.log("error", e);
}

const reverb = new Tone.Reverb({
  decay: 32,
  wet: 0.5,
});
const panner = new Tone.Panner(-0.5);

sampler.chain(panner, reverb, Tone.Destination);

const play = (options: PlayOptions) => {
  const { startTime, measures, count } = options;
  const direction = store.getState().musicVariables.direction;
  if (count === undefined || count < 2) {
    return;
  }
  let note = "";

  if (direction === -1) {
    const random = randomNumberBetween(0, 2);
    if (random === 0) {
      return;
    }
    note = "A0";
    if (random === 2) {
      note = "A1";
    }
  }

  if (direction === 1) {
    const random = randomNumberBetween(0, 6);
    if (random < 4) {
      return;
    }
    note = "A2";
    if (random === 6) {
      note = "A3";
    }
  }

  if (note.length === 0) return;

  let part = new Tone.Part(
    function (time) {
      sampler.triggerAttack(note, time);
    },
    [{ time: "0:0:0" }]
  );
  part.loop = measures / 8;
  part.loopEnd = "8:0";
  part.start(startTime);
};

const Chords = { play };
export default Chords;
