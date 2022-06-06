import * as Tone from "tone";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./Loop";

const HATPATTERNS = {
  straight: [
    { time: "0:0:2" },
    { time: "0:1:2" },
    { time: "0:2:2" },
    { time: "0:3:2" },
  ],
  fast: [
    { time: "0:0:0", velocity: 0.8 },
    { time: "0:0:1", velocity: 0.9 },
    { time: "0:0:2", velocity: 1 },
    { time: "0:0:3", velocity: 0.9 },
    { time: "0:1:0", velocity: 0.8 },
    { time: "0:1:1", velocity: 0.9 },
    { time: "0:1:2", velocity: 1 },
    { time: "0:1:3", velocity: 0.9 },
    { time: "0:2:0", velocity: 0.8 },
    { time: "0:2:1", velocity: 0.9 },
    { time: "0:2:2", velocity: 1 },
    { time: "0:2:3", velocity: 0.9 },
    { time: "0:3:0", velocity: 0.8 },
    { time: "0:3:1", velocity: 0.9 },
    { time: "0:3:2", velocity: 1 },
    { time: "0:3:3", velocity: 0.9 },
  ],
};

let currentPart: Tone.Part;

export let hatDrum = new Tone.Player();
try {
  hatDrum = new Tone.Player({
    url: `${window.location.href}sounds/hat.wav`,
  }).toDestination();

  Tone.loaded().then(() => {
    console.log("loaded HAT");
  });

  hatDrum.volume.value = 8;
} catch (e) {
  console.log("error", e);
}

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;

  const randomNumber = randomNumberBetween(0, 3);
  let pattern = HATPATTERNS.straight;
  if (randomNumber === 3) {
    pattern = HATPATTERNS.fast;
  }
  currentPart = new Tone.Part((time) => {
    hatDrum.start(time);
  }, pattern);
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start(startTime);
};

const Hat = { play };
export default Hat;
