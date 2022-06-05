import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";

export const SNAREPATTERNS = {
  straight: [{ time: "0:1:0" }, { time: "0:3:0" }],
  double: [
    { time: "0:0:0" },
    { time: "0:1:0" },
    { time: "0:1:1" },
    { time: "0:2:0" },
    { time: "0:3:0" },
    { time: "0:3:1" },
  ],
  dnb: [{ time: "0:0:0" }, { time: "0:2:2" }],
  half: [{ time: "0:2:0" }],
  dubstep: [{ time: "0:0:0" }, { time: "0:1:2" }],
};

export const snareDrum = new Tone.NoiseSynth({
  volume: 10,
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0,
  },
}).chain(new Tone.Filter({ frequency: 3000 }), Tone.Destination);
let currentPart: Tone.Part;

let player = new Tone.Player();
try {
  player = new Tone.Player({
    url: `${window.location.href}sounds/snare.wav`,
  }).toDestination();

  Tone.loaded().then(() => {
    console.log("loaded Snare");
  });

  player.volume.value = 12;
} catch (e) {
  console.log("error", e);
}

const play = (measures: number) => {
  let pattern = SNAREPATTERNS.straight;
  const randomNumber = randomNumberBetween(0, 3);
  if (store.getState().musicVariables.direction === 0 || randomNumber === 0) {
    pattern = SNAREPATTERNS.half;
  }
  currentPart = new Tone.Part(function (time) {
    player.start(time);
    //  snareDrum.triggerAttackRelease("8n", time);
  }, pattern);
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start();
};

const Snare = { play };
export default Snare;
