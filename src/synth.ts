import * as Tone from "tone";

Tone.Transport.bpm.value = 250;

export const synth = new Tone.PolySynth();
export const synth2 = new Tone.PolySynth();
export const bass = new Tone.Synth({
  oscillator: {
    type: "triangle",
  },
}).toDestination();
export const kickDrum = new Tone.MembraneSynth({ volume: 6 }).toDestination();
export const snareDrum = new Tone.NoiseSynth({
  volume: 10,
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0.15,
    release: 0,
  },
}).chain(new Tone.Filter({ frequency: 3000 }), Tone.Destination);
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
synth2.chain(reverb, Tone.Destination);

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

export const neutralPattern = new Tone.Part((time, note) => {
  synth.triggerAttackRelease(note.note, "16n", time);
  //the order of the notes passed in depends on the pattern
}, neutralNotesWithTimes);

neutralPattern.loop = true;
neutralPattern.loopEnd = "2:0";

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

const kicks = [{ time: "0:0" }, { time: "1:0" }, { time: "1:1" }];

const snares = [
  { time: "0:2" },
  { time: "1:2" },
  { time: "2:2" },
  { time: "3:2" },
  { time: "4:2" },
  { time: "5:2" },
  { time: "6:2" },
  { time: "7:2" },
];

const snaresHalfTime = [
  { time: "1:0" },
  { time: "2:0" },
];

const hat = [
  { time: "0:0" },
  { time: "0:1" },
  { time: "0:2" },
  { time: "0:3" },
];

export const kickPart = new Tone.Part(function (time) {
  kickDrum.triggerAttackRelease("C1", "8n", time);
}, kicks);

kickPart.loop = true;
kickPart.loopEnd = "2:0";

export const snarePart = new Tone.Part(function (time) {
  snareDrum.triggerAttackRelease("4n", time);
}, snares);

snarePart.loop = true;

export const snarePartHalfTime = new Tone.Part(function (time) {
  snareDrum.triggerAttackRelease("4n", time);
}, snaresHalfTime);

snarePartHalfTime.loop = true;
snarePartHalfTime.loopEnd = "3:0";

export const hatPart = new Tone.Part(function (time) {
  hatDrum.triggerAttackRelease("16n", time);
}, hat);
hatPart.loop = true;

Tone.Destination.volume.value = -12;
