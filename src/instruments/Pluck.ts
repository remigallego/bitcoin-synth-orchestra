import * as Tone from "tone";
import { store } from "../store";

export const pluck = new Tone.PluckSynth({
  volume: -999,
});

const reverb = new Tone.Reverb({
  decay: 22,
  wet: 0.5,
});
const pingPong = new Tone.FeedbackDelay("8n", 0.5).toDestination();
pingPong.wet.value = 0.2;
pluck.chain(reverb, Tone.Destination);

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const neutralNotes = ["A3", "C4", "E4", "G4", "C4", "G4", "A3", "G3"];
const happyNotes = ["A3", "C4", "E4", "F4", "G4"];
const happierNotes = ["A4", "C4", "E5", "F5", "G5"];
const sadNotes = ["B3", "C4", "D4", "E4", "F4"];

const generateNeutralNotes = () => {
  return [
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
  ].map((e) => {
    return {
      time: e.time,
      note: "A3",
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
  currentPart = new Tone.Part(function (time, note) {
    pluck.triggerAttackRelease(note.note, "32n", time);
  }, generateNeutralNotes());
  currentPart.loop = measures;
  currentPart.loopEnd = "1:0";
  currentPart.start();
};

const playRandomNote = () => {
  const randomNote =
    neutralNotesWithTimes[randomBetween(0, neutralNotesWithTimes.length - 1)];
  pluck.triggerAttackRelease(randomNote.note, "32n");
};

const Pluck = { play, playRandomNote };
export default Pluck;
