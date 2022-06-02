import * as Tone from "tone";
import { store } from "../store";

export const synthLead = new Tone.PolySynth({
  volume: -3,
});

const reverb = new Tone.Reverb({
  decay: 22,
  wet: 0.5,
});
const pingPong = new Tone.FeedbackDelay("8n", 0.5).toDestination();
pingPong.wet.value = 0.2;
synthLead.chain(pingPong, reverb, Tone.Destination);

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// @ts-ignore
window.synth = synthLead;
const neutralNotes = ["A3", "C4", "E4", "G4", "C4", "G4", "A3", "G3"];
const happyNotes = ["A3", "C4", "E4", "F4", "G4"];
const sadNotes = ["B3", "C4", "D4", "E4", "F4"];

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
        : randomBetween(0.7, 0.9);
      return {
        time: e.time,
        note: notes[randomBetween(0, notes.length - 1)],
        velocity,
      };
    });
};

const neutralNotesWithTimes = [
  { time: "0:0", note: "A3" },
  { time: "0:1", note: "C4" },
  { time: "0:2", note: "E4" },
  { time: "0:3", note: "G4" },
  { time: "1:1", note: "C4" },
  { time: "1:2", note: "G4" },
  { time: "1:3", note: "C4" },
];
const happyNotesWithTime = [
  { time: "0:0", note: "A3" },
  { time: "0:1", note: "C4" },
  { time: "0:2", note: "E4" },
  { time: "0:3", note: "F4" },
  { time: "1:1", note: "G4" },
  { time: "1:2", note: "F4" },
  { time: "1:3", note: "E4" },
];

let currentPart: Tone.Part;

const play = (measures: number) => {
  const randomNumber = randomBetween(0, 3);
  if (randomNumber === 3) {
    console.log("play 2 synth patterns");
    let partOne = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    partOne.loop = measures / 2;
    partOne.loopEnd = "1:0";
    partOne.start();
    let partTwo = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    partTwo.loop = measures / 2;
    partTwo.loopEnd = "1:0";
    partTwo.start("+4m");
  } else {
    currentPart = new Tone.Part(function (time, note) {
      synthLead.triggerAttackRelease(note.note, "32n", time, note.velocity);
    }, generateNeutralNotes());
    currentPart.loop = measures;
    currentPart.loopEnd = "1:0";
    currentPart.start();
  }
};

const SynthLead = { play };
export default SynthLead;
