import * as Tone from "tone";

export const DEFAULT_BPM = 140;

Tone.Transport.bpm.value = DEFAULT_BPM;

export const synth = new Tone.PolySynth();
export const synth2 = new Tone.PluckSynth();
synth2.volume.value = 0;

export const hatDrum = new Tone.NoiseSynth({
  volume: 2,
  noise: {
    type: "pink",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.02,
    decay: 0.02,
    sustain: 0.02,
    release: 0,
  },
}).chain(
  new Tone.Filter({ frequency: 10000, type: "highpass" }),
  Tone.Destination
);

const reverb = new Tone.Reverb({
  decay: 22,
  wet: 0.5,
});
const pingPong = new Tone.FeedbackDelay("8n", 0.5).toDestination();
pingPong.wet.value = 0.2;
synth.chain(pingPong, reverb, Tone.Destination);
synth2.chain(Tone.Destination);

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateNeutralNotes = () => {
  const neutralNotes = ["A3", "C4", "E4", "G4", "C4", "G4"];
  return [
    { time: "0:0", note: "A3" },
    { time: "0:1", note: "C4" },
    { time: "0:2", note: "E4" },
    { time: "0:3", note: "G4" },
    { time: "1:1", note: "C4" },
    { time: "1:2", note: "G4" },
    { time: "1:3", note: "C4" },
  ].map((e) => {
    return {
      time: e.time,
      note: neutralNotes[randomBetween(0, neutralNotes.length - 1)],
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

const happyNotes = ["A3", "C4", "E4", "F4", "G4"];
const happierNotes = ["A4", "C4", "E5", "F5", "G5"];
const sadNotes = ["B3", "C4", "D4", "E4", "F4"];

export let neutralPattern = new Tone.Part((time, note) => {
  synth.triggerAttackRelease(note.note, "16n", time);
  //the order of the notes passed in depends on the pattern
}, generateNeutralNotes());

neutralPattern.loop = true;
neutralPattern.loopEnd = "2:0";

export const regenerateNeutralPattern = () => {
  neutralPattern.stop(0);
  neutralPattern = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(note.note, "16n", time);
    //the order of the notes passed in depends on the pattern
  }, generateNeutralNotes());
  neutralPattern.loop = true;
  neutralPattern.loopEnd = "2:0";
  return neutralPattern;
};

export const happyPattern = new Tone.Part(function (time, note) {
  synth.triggerAttackRelease(note.note, "8n", time);
  //the order of the notes passed in depends on the pattern
}, happyNotesWithTime);

happyPattern.loop = true;
happyPattern.loopEnd = "2:0";

export const happierPattern = new Tone.Pattern(
  function (time, note) {
    synth.triggerAttackRelease(note, "8n", time);
    //the order of the notes passed in depends on the pattern
  },
  happierNotes,
  "randomOnce"
);

export const sadPattern = new Tone.Pattern(
  function (time, note) {
    synth.triggerAttackRelease(note, "8n", time);
    //the order of the notes passed in depends on the pattern
  },
  sadNotes,
  "randomOnce"
);

const hat = [{ time: "0:1" }, { time: "0:2" }, { time: "0:3" }];

export const hatPart = new Tone.Part(function (time) {
  hatDrum.triggerAttackRelease("16n", time);
}, hat);
hatPart.loop = true;

Tone.Destination.volume.value = -12;
