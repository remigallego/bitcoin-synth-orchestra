import * as Tone from "tone";
import Bass from "./Bass";
import Crash from "./Crash";
import Hat from "./Hat";
import Kick from "./Kick";
import Pad from "./Pad";
import Snare from "./Snare";
import SynthLead from "./SynthLead";
import Toms from "./Toms";

let count = 0;

export interface PlayOptions {
  measures: number;
  startTime: number;
}

const startLoop = () => {
  const loop = new Tone.Loop(() => {
    const startTime = Tone.now();
    SynthLead.play({ measures: 8, startTime });
    Bass.play({ measures: 8, startTime });
    Pad.play({ measures: 8, startTime });
    Kick.play({ measures: 8, startTime });
    Snare.play({ measures: 8, startTime });
    Toms.play({ measures: 8, startTime });
    Hat.play({ measures: 8, startTime });

    Crash.play({ measures: 8, startTime });
    count += 1;
  }, "8m");

  loop.start("1m");
};

const Loop = { startLoop };

export default Loop;
