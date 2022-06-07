import * as Tone from "tone";
import { Loop } from "tone";
import Bass from "./Bass";
import Chords from "./Chords";
import Clap from "./Clap";
import Crash from "./Crash";
import Hat from "./Hat";
import Kick from "./Kick";
import Snare from "./Snare";
import SynthLead from "./SynthLead";
import Toms from "./Toms";

let count = 0;

export interface PlayOptions {
  measures: number;
  startTime: number;
  count?: number;
}

export let loop: Loop;

const startLoop = () => {
  loop = new Tone.Loop(() => {
    const startTime = Tone.now();
    count += 1;
    if (count === 1) {
      SynthLead.play({ measures: 8, startTime, count });
      Chords.play({ measures: 8, startTime, count });
      Bass.play({ measures: 8, startTime });
      Toms.play({ measures: 8, startTime });
      return;
    }
    if (count === 2) {
      SynthLead.play({ measures: 8, startTime, count });
      Chords.play({ measures: 8, startTime, count });
      Bass.play({ measures: 8, startTime });
      Toms.play({ measures: 8, startTime });
      Kick.play({ measures: 8, startTime });
      Snare.play({ measures: 8, startTime });
      return;
    }
    SynthLead.play({ measures: 8, startTime, count });
    Bass.play({ measures: 8, startTime });
    Clap.play({ measures: 8, startTime });
    Chords.play({ measures: 8, startTime, count });
    Kick.play({ measures: 8, startTime });
    Snare.play({ measures: 8, startTime });
    Toms.play({ measures: 8, startTime });
    Hat.play({ measures: 8, startTime });
    Crash.play({ measures: 8, startTime });
  }, "8m");
  const startTime = Tone.now();

  loop.start(startTime);
};

const SongLoop = { startLoop };

export default SongLoop;
