import * as Tone from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import { PlayOptions } from "./SongLoop";

let synth = 2;

/* Option1:
export const synthLead = new Tone.PolySynth({
  volume: 1,
}); */

const synthOptions: RecursivePartial<Tone.SynthOptions> = {
  volume: -3,
  oscillator: {
    type: "pwm",
  },
};

export let synthLead = new Tone.Synth(synthOptions);

// @ts-ignore
/* export let synthLead = new Tone.Sampler();
try {
  // @ts-ignore
  synthLead = new Tone.Sampler(
    {
      A4: "A3.wav",
      B4: "B3.wav",
      C5: "C4.wav",
      E5: "E4.wav",
      G4: "G3.wav",
      G5: "G4.wav",
    },
    () => {},
    `${window.location.href}sounds/lead/`
  ).toDestination();

  synthLead.volume.value = 10;

  Tone.loaded().then(() => {
    console.log("loaded");
  });
} catch (error) {
  console.log(error);
} */

const panner = new Tone.Panner(0);
const reverb = new Tone.Reverb({
  decay: 32,
  wet: 0.5,
});
const pingPong = new Tone.FeedbackDelay(0.107, 0.5).toDestination();
export const synthLeadFilter = new Tone.Filter({ frequency: 14000 });
const synthLeadHiPassFilter = new Tone.Filter({
  frequency: 2000,
  type: "highpass",
});

export const changeSynthLead = () => {
  if (synth === 2) {
    // @ts-ignore
    synthLead = new Tone.PolySynth({
      volume: 6,
    });
    synth = 1;
    synthLead.chain(pingPong, reverb, synthLeadFilter, Tone.Destination);
  } else {
    // @ts-ignore
    synthLead = new Tone.Synth({
      volume: 0,
      oscillator: {
        type: "fmsquare11",
        modulationType: "sawtooth",
        modulationIndex: 0.5,
        harmonicity: 0.5,
        phase: 0,
      },
    });
    synth = 2;
    synthLead.chain(
      pingPong,
      reverb,
      synthLeadFilter,
      synthLeadHiPassFilter,
      Tone.Destination
    );
  }
};

pingPong.wet.value = 0.3;
synthLead.chain(
  pingPong,
  reverb,
  synthLeadFilter,
  synthLeadHiPassFilter,
  Tone.Destination
);

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const neutralNotes = ["A3", "C4", "E4", "G4", "C4", "G4", "A3", "G3"];
const happyNotes = ["A3", "C4", "E4", "F4", "G4"];
const sadNotes = ["B3", "C4", "D4", "E4", "F4"];
//
const times = [
  { time: "0:0:0" },
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
];

const generateNeutralNotes = () => {
  const notesPossibles = [neutralNotes, happyNotes, sadNotes];
  const idxRandom = randomBetween(0, notesPossibles.length - 1);
  const notes = [neutralNotes, happyNotes, sadNotes][idxRandom];
  return times
    .filter((t, idx) => {
      if (randomBetween(0, 4) === 0) {
        return false;
      }
      return true;
    })
    .map((e) => {
      const velocity = ["0:0:0", "0:1:0", "0:2:0", "0:3:0"].includes(e.time)
        ? 0.1
        : ["0:0:2", "0:1:2", "0:2:2", "0:3:2"].includes(e.time)
        ? randomBetween(0.8, 0.9)
        : randomBetween(0.7, 0.9);
      return {
        time: e.time,
        note: notes[randomBetween(0, notes.length - 1)],
        velocity,
      };
    });
};

let currentPart: Tone.Part;

const play = (options: PlayOptions) => {
  const { measures, startTime } = options;
  const time4m = Tone.Time("4m").toSeconds();
  const randomNumber = randomBetween(0, 3);

  if (randomNumber === 3) {
    console.log("play 2 synth patterns");
    let partOne = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    partOne.loop = measures / 2;
    partOne.loopEnd = "1:0";
    partOne.start(startTime);
    let partTwo = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    partTwo.loop = measures / 2;
    partTwo.loopEnd = "1:0";
    partTwo.start(startTime + time4m);
  } else {
    currentPart = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    currentPart.loop = measures;
    currentPart.loopEnd = "1:0";
    currentPart.start(startTime);
  }
};

const SynthLead = { play };
export default SynthLead;
