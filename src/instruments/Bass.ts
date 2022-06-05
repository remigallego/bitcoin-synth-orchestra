import * as Tone from "tone";
import { store } from "../store";
import { randomNumberBetween } from "../utils/maths";
import mp3File from "./bass-a2.mp3";

const BASSPATTERNS = {
  straightA: [
    { time: "0:0:0", note: "A2", velocity: 0.2 },
    { time: "0:0:1", note: "A2", velocity: 0.7 },
    { time: "0:0:2", note: "A2", velocity: 0.9 },
    { time: "0:0:3", note: "A2", velocity: 0.7 },
    { time: "0:1:0", note: "A2", velocity: 0.2 },
    { time: "0:1:1", note: "A2", velocity: 0.7 },
    { time: "0:1:2", note: "A2", velocity: 0.9 },
    { time: "0:1:3", note: "A2", velocity: 0.7 },
    { time: "0:2:0", note: "A2", velocity: 0.2 },
    { time: "0:2:1", note: "A2", velocity: 0.7 },
    { time: "0:2:2", note: "A2", velocity: 0.9 },
    { time: "0:2:3", note: "A2", velocity: 0.7 },
    { time: "0:3:0", note: "A2", velocity: 0.2 },
    { time: "0:3:1", note: "A2", velocity: 0.7 },
    { time: "0:3:2", note: "A2", velocity: 0.9 },
    { time: "0:3:3", note: "A2", velocity: 0.7 },
  ],
  halfA: [
    { time: "0:0:0", note: "A2", velocity: 0.2 },
    { time: "0:0:2", note: "A2", velocity: 0.9 },
    { time: "0:1:0", note: "A2", velocity: 0.2 },
    { time: "0:1:2", note: "A2", velocity: 0.9 },
    { time: "0:1:3", note: "A2", velocity: 0.7 },
    { time: "0:2:0", note: "A2", velocity: 0.2 },
    { time: "0:2:2", note: "A2", velocity: 0.9 },
    { time: "0:3:0", note: "A2", velocity: 0.2 },
    { time: "0:3:2", note: "A2", velocity: 0.9 },
  ],
  straightF: [
    { time: "0:0:0", note: "F2", velocity: 0.2 },
    { time: "0:0:1", note: "F2", velocity: 0.7 },
    { time: "0:0:2", note: "F2", velocity: 0.9 },
    { time: "0:0:3", note: "F2", velocity: 0.7 },
    { time: "0:1:0", note: "F2", velocity: 0.2 },
    { time: "0:1:1", note: "F2", velocity: 0.7 },
    { time: "0:1:2", note: "F2", velocity: 0.9 },
    { time: "0:1:3", note: "F2", velocity: 0.7 },
    { time: "0:2:0", note: "F2", velocity: 0.2 },
    { time: "0:2:1", note: "F2", velocity: 0.7 },
    { time: "0:2:2", note: "F2", velocity: 0.9 },
    { time: "0:2:3", note: "F2", velocity: 0.7 },
    { time: "0:3:0", note: "F2", velocity: 0.2 },
    { time: "0:3:1", note: "F2", velocity: 0.7 },
    { time: "0:3:2", note: "F2", velocity: 0.9 },
    { time: "0:3:3", note: "F2", velocity: 0.7 },
  ],
  straightG: [
    { time: "0:0:0", note: "G2", velocity: 0.2 },
    { time: "0:0:1", note: "G2", velocity: 0.7 },
    { time: "0:0:2", note: "G2", velocity: 0.9 },
    { time: "0:0:3", note: "G2", velocity: 0.7 },
    { time: "0:1:0", note: "G2", velocity: 0.2 },
    { time: "0:1:1", note: "G2", velocity: 0.7 },
    { time: "0:1:2", note: "G2", velocity: 0.9 },
    { time: "0:1:3", note: "G2", velocity: 0.7 },
    { time: "0:2:0", note: "G2", velocity: 0.2 },
    { time: "0:2:1", note: "G2", velocity: 0.7 },
    { time: "0:2:2", note: "G2", velocity: 0.9 },
    { time: "0:2:3", note: "G2", velocity: 0.7 },
    { time: "0:3:0", note: "G2", velocity: 0.2 },
    { time: "0:3:1", note: "G2", velocity: 0.7 },
    { time: "0:3:2", note: "G2", velocity: 0.9 },
    { time: "0:3:3", note: "G2", velocity: 0.7 },
  ],
  straightD: [
    { time: "0:0:0", note: "D2", velocity: 0.2 },
    { time: "0:0:1", note: "D2", velocity: 0.7 },
    { time: "0:0:2", note: "D2", velocity: 0.9 },
    { time: "0:0:3", note: "D2", velocity: 0.7 },
    { time: "0:1:0", note: "D2", velocity: 0.2 },
    { time: "0:1:1", note: "D2", velocity: 0.7 },
    { time: "0:1:2", note: "D2", velocity: 0.9 },
    { time: "0:1:3", note: "D2", velocity: 0.7 },
    { time: "0:2:0", note: "D2", velocity: 0.2 },
    { time: "0:2:1", note: "D2", velocity: 0.7 },
    { time: "0:2:2", note: "D2", velocity: 0.9 },
    { time: "0:2:3", note: "D2", velocity: 0.7 },
    { time: "0:3:0", note: "D2", velocity: 0.2 },
    { time: "0:3:1", note: "D2", velocity: 0.7 },
    { time: "0:3:2", note: "D2", velocity: 0.9 },
    { time: "0:3:3", note: "D2", velocity: 0.7 },
  ],
  straigthB: [
    { time: "0:0:0", note: "B2", velocity: 0.2 },
    { time: "0:0:1", note: "B2", velocity: 0.7 },
    { time: "0:0:2", note: "B2", velocity: 0.9 },
    { time: "0:0:3", note: "B2", velocity: 0.7 },
    { time: "0:1:0", note: "B2", velocity: 0.2 },
    { time: "0:1:1", note: "B2", velocity: 0.7 },
    { time: "0:1:2", note: "B2", velocity: 0.9 },
    { time: "0:1:3", note: "B2", velocity: 0.7 },
    { time: "0:2:0", note: "B2", velocity: 0.2 },
    { time: "0:2:1", note: "B2", velocity: 0.7 },
    { time: "0:2:2", note: "B2", velocity: 0.9 },
    { time: "0:2:3", note: "B2", velocity: 0.7 },
    { time: "0:3:0", note: "B2", velocity: 0.2 },
    { time: "0:3:1", note: "B2", velocity: 0.7 },
    { time: "0:3:2", note: "B2", velocity: 0.9 },
    { time: "0:3:3", note: "B2", velocity: 0.7 },
  ],
};

let bass = new Tone.Synth({
  oscillator: {
    type: "amsawtooth8",
    volume: 8,
  },
});

export const bassFilter = new Tone.Filter({ frequency: 2000 });
const chorus = new Tone.Chorus(1, 2.5, 0.4).toDestination().start();

bass.chain(chorus, bassFilter, Tone.Destination);

const randomizeVelocity = (velocity: number) => {
  if (velocity === 0.2) {
    return 0.2;
  }
  const rand = randomNumberBetween(0, 2);
  if (rand === 0) {
    return 0.7;
  }
  if (rand === 1) {
    return 0.8;
  }
  if (rand === 2) {
    return 0.9;
  }
};

let sampler = new Tone.Sampler();
try {
  console.log("url = ", process.env.PUBLIC_URL);
  const url = "http://localhost:3000";

  sampler = new Tone.Sampler(
    {
      A2: "bass-a2.mp3",
    },
    () => {},
    `http://localhost:3000/`
  ).toDestination(); // play as soon as the buffer is loaded

  Tone.loaded().then(() => {
    console.log("loaded");
  });
  //player.autostart = true;

  sampler.volume.value = 12;
} catch (e) {
  console.log("error", e);
}

const play = (measures: number) => {
  const direction = store.getState().musicVariables.direction;
  const randomNumber = randomNumberBetween(0, 2);
  let patternA = BASSPATTERNS.straightA;
  if (direction === -1) {
    patternA = BASSPATTERNS.straigthB;
  } else if (randomNumber === 4) {
    patternA = BASSPATTERNS.halfA;
  }
  let partOne = new Tone.Part(function (time, note) {
    bass.triggerAttackRelease(
      note.note,
      "16n",
      time,
      randomizeVelocity(note.velocity)
    );
  }, patternA);
  partOne.loopEnd = "1:0:0";
  partOne.loop = 4;
  partOne.start();

  if (randomNumber === 2) {
    let nextPart = new Tone.Part(function (time, note) {
      bass.triggerAttackRelease(
        note.note,
        "16n",
        time,
        randomizeVelocity(note.velocity)
      );
    }, BASSPATTERNS.straightF);
    nextPart.start("+4m");
    nextPart.loopEnd = "1:0:0";
    nextPart.loop = 3;
    let nextPart2 = new Tone.Part(function (time, note) {
      bass.triggerAttackRelease(
        note.note,
        "16n",
        time,
        randomizeVelocity(note.velocity)
      );
    }, BASSPATTERNS.straightG);
    nextPart2.start("+7m");
    nextPart2.loopEnd = "1:0:0";
    nextPart2.loop = 1;
  } else {
    let nextPart = new Tone.Part(function (time, note) {
      bass.triggerAttackRelease(
        note.note,
        "16n",
        time,
        randomizeVelocity(note.velocity)
      );
    }, BASSPATTERNS.straightF);
    nextPart.start("+4m");
    nextPart.loopEnd = "1:0:0";
    nextPart.loop = 4;
  }
};

const Bass = { play };
export default Bass;
