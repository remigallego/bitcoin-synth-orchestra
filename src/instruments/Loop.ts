import * as Tone from "tone";
import Bass from "./Bass";
import Hat from "./Hat";
import Kick from "./Kick";
import Pad from "./Pad";
import Snare from "./Snare";
import SynthLead from "./SynthLead";
import Toms from "./Toms";

let count = 0;

const startLoop = () => {
  const loop = new Tone.Loop(() => {
    SynthLead.play(8);
    Bass.play(8);
    Pad.play(8);
    Kick.play(8);
    Hat.play(8);
    Snare.play(8);
    Toms.play(8);
    count += 1;
  }, "8m");

  loop.start("1m");
};

const Loop = { startLoop };

export default Loop;
