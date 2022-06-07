import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";
import { PlayOptions } from "./SongLoop";

export const CLAPPATTERNS = {
  straight: [{ time: "1:3:1" }, { time: "1:3:2" }, { time: "1:4:2" }],
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

let currentPart: Tone.Part;
const reverb = new Tone.Reverb({
  decay: 3,
  wet: 0.3,
});

let player = new Tone.Player();
try {
  player = new Tone.Player({
    url: `${window.location.href}sounds/clap.wav`,
  });

  Tone.loaded().then(() => {
    console.log("loaded CLAP");
  });
  //player.autostart = true;

  player.volume.value = 12;
} catch (e) {
  console.log("error", e);
}

player.chain(reverb, Tone.Destination);

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;
  const direction = store.getState().musicVariables.direction;
  if (direction === -1) {
    return;
  }
  let random = randomNumberBetween(0, 2);
  console.log({ randomHat: random });
  if (random === 1) {
    let pattern = CLAPPATTERNS.straight;

    currentPart = new Tone.Part(function (time) {
      player.start(time);
    }, pattern);
    currentPart.loop = measures / 8;
    currentPart.loopEnd = "8:0";
    currentPart.start(startTime);
  }
};

const Clap = { play };
export default Clap;
