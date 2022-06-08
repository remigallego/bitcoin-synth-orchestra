import * as Tone from "tone";
import { Middleware } from "redux";
import { RootState } from "..";
import { bassFilter } from "../../instruments/Bass";
import { pad } from "../../instruments/Pad";
import Pluck, { pluck } from "../../instruments/Pluck";
import { snareDrum } from "../../instruments/Snare";
import { synthLead, synthLeadFilter } from "../../instruments/SynthLead";
import { actions } from "../chartData";
import { actions as musVarActions } from "../musicVariables";
import { hatDrum } from "../../instruments/Hat";

const calculatePercentage = (last: string, first: string) => {
  if (!last || !first) return false;
  const diff = parseFloat(last) - parseFloat(first);
  const percentage = (diff / parseFloat(first)) * 1000;
  return percentage;
};

const synthMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!actions.setChartData.match(action)) {
      return next(action);
    }

    const { data } = store.getState().chartData;

    const last = data[data.length - 1]?.price;
    const first = data[0]?.price;

    const perc = calculatePercentage(last, first);

    const getPriceDirection = () => {
      if (perc >= 4) {
        return 2;
      }
      if (perc >= 0.1) {
        return 1;
      }
      if (perc <= -0.1) {
        return -1;
      }
      if (perc > -0.1 && perc < 0.1) {
        return 0;
      }
      return 0;
    };

    const direction = getPriceDirection();
    if (direction !== store.getState().musicVariables.direction) {
      store.dispatch(musVarActions.setDirection(direction));

      synthLead.set({ detune: direction * 1200 });
      pad.set({ volume: direction !== 0 ? -10 : -100 });
      synthLead.set({ volume: direction === -1 ? -10 : -3 });
      hatDrum.set({ volume: direction === -1 ? -999 : 3 });
      snareDrum.set({ volume: direction === -1 ? -999 : 10 });
      bassFilter.set({ frequency: direction === -1 ? 200 : 3000 });
      synthLeadFilter.set({ frequency: direction === -1 ? 4000 : 20000 });

      if (direction === -1) {
        pluck.set({ volume: 0 });
      }
    }

    try {
      // For some reason the Pluck instrument keeps
      // throwing exceptions, it still works though
      if (Tone.Transport.state === "started" && direction === -1) {
        //   Pluck.playRandomNote();
      }
    } catch (e) {
      console.log("error", e);
    }
    next(action);
  };

export default synthMiddleware;
