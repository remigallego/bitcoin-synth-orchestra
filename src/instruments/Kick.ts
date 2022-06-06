import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./Loop";

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

let kickDrum = new Tone.MembraneSynth({ volume: 8 }).toDestination();
let currentPart: Tone.Part;

let player = new Tone.Player();
try {
  player = new Tone.Player({
    url: `${window.location.href}sounds/kick.wav`,
  }).toDestination(); // play as soon as the buffer is loaded

  Tone.loaded().then(() => {
    console.log("loaded KICK");
  });
  //player.autostart = true;

  player.volume.value = 12;
} catch (e) {
  console.log("error", e);
}

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;
  const direction = store.getState().musicVariables.direction;
  let pattern = KICKPATTERNS.straight;

  if (direction === 1 || direction === -1) {
    pattern = KICKPATTERNS.straight;
  } else if (direction === 0) {
    pattern = KICKPATTERNS.dubstep;
  }

  currentPart = new Tone.Part(function (time) {
    player.start(time);
    //kickDrum.triggerAttackRelease("C1", "16n", time);
  }, pattern);
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start(startTime);
};

const Kick = { play };
export default Kick;
