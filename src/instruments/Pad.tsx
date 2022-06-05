import * as Tone from "tone";
import { store } from "../store";

export const pad = new Tone.DuoSynth({
  voice0: {
    envelope: {
      attack: 0.7,
      release: 1,
    },
  },
  voice1: {
    envelope: {
      attack: 0.7,
      release: 1,
    },
  },
  volume: -999,
});

const reverb = new Tone.Reverb({
  decay: 100,
  wet: 0.5,
});
const pingPong = new Tone.FeedbackDelay("4n", 0.5).toDestination();
pingPong.wet.value = 0.5;
pad.chain(pingPong, reverb, Tone.Destination);

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDownNotes = () => {
  const notes = ["A2", "C3", "E3", "G2", "C2", "A3"];
  let chosen: string[] = [];
  return [{ time: "0:0:0" }, { time: "2:3:0" }].map((e, i, arr) => {
    let chosenNote = notes.filter((e) => !chosen.includes(e))[
      randomBetween(0, notes.length - 1)
    ];
    chosen.push(chosenNote);
    return {
      time: e.time,
      note: chosenNote,
    };
  });
};

const generateUpNotes = () => {
  const notes = ["A2"];
  let chosen: string[] = [];
  return [{ time: "0:0:0" }].map((e, i, arr) => {
    let chosenNote = notes.filter((e) => !chosen.includes(e))[
      randomBetween(0, notes.length - 1)
    ];
    chosen.push(chosenNote);
    return {
      time: e.time,
      note: chosenNote,
    };
  });
};

let currentPart: Tone.Part;

const play = (measures: number) => {
  const direction = store.getState().musicVariables.direction;
  if (direction === 1) {
    currentPart = new Tone.Part((time, note) => {
      pad.triggerAttackRelease(note.note, "1m", time);
    }, generateUpNotes());
    currentPart.loop = measures / 8;
    currentPart.loopEnd = "8:0";
    currentPart.start();
  } else {
    currentPart = new Tone.Part(function (time, note) {
      pad.triggerAttackRelease(note.note, "1m", time);
    }, generateDownNotes());
    currentPart.loop = measures / 4;
    currentPart.loopEnd = "4:0";
    currentPart.start();
  }
};

const Pad = { play };
export default Pad;
