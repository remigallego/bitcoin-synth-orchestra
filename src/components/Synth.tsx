import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { PriceData } from "../context/PriceDataContext";
import * as Tone from "tone";
import {
  neutralPattern,
  happyPattern,
  sadPattern,
  synth2,
  snarePart,
  kickPart,
  bass,
  happierPattern,
  kickDrum,
  snareDrum,
  hatPart,
} from "../synth";
import { IIIChord, IVChord, VIChord } from "../utils/music";
interface Props {
  data: PriceData["data"];
}
// Tone.Transport.bpm.value = 150;

const Synth: FunctionComponent<Props> = (props) => {
  const [started, setStarted] = useState(false);
  const [priceDirection, setPriceDirection] = useState(0); // 0, 1 or -1

  const calculatePercentage = (data: PriceData["data"]) => {
    const last = data[data.length - 1];
    const first = data[0];
    if (!last || !first) return false;
    const diff = parseFloat(last.price) - parseFloat(first.price);
    const percentage = (diff / parseFloat(first.price)) * 1000;
    return percentage;
  };

  useEffect(() => {
    if (!started) return;

    const percentage = calculatePercentage(props.data);

    const getPriceDirection = () => {
      console.log({ percentage });
      if (percentage > 4) {
        return 2;
      }
      if (percentage > 0.1) {
        return 1;
      }
      if (percentage < -0.1) {
        return -1;
      }
      if (percentage > -0.03 && percentage < 0.03) {
        return 0;
      }
    };

    const stopAll = () => {
      happyPattern.stop(0);
      sadPattern.stop(0);
      neutralPattern.stop(0);
      happierPattern.stop(0);
    };

    const direction = getPriceDirection();

    // Happy
    if (direction === 2) {
      bass.triggerAttackRelease("A2", "8n");
      if (priceDirection !== 2) {
        console.log("Go happier");
        stopAll();
        setPriceDirection(2);
        Tone.Transport.bpm.value = 300;

        happierPattern.start(0);
      }
    } else if (direction === 1) {
      bass.triggerAttackRelease("G1", "8n");
      if (priceDirection !== 1) {
        console.log("Go happy");
        Tone.Transport.bpm.value = 250;
        stopAll();
        setPriceDirection(1);
        happyPattern.start(0);
      }
      // Sad
    } else if (direction === -1) {
      bass.triggerAttackRelease("A1", "8n");
      //  bass.triggerAttackRelease(IIIChord, "8n");
      if (priceDirection !== -1) {
        Tone.Transport.bpm.value = 250;
        console.log("Go sad");
        stopAll();
        setPriceDirection(-1);
        sadPattern.start(0);
      }
      // Neutral
    } else if (direction === 0) {
      bass.triggerAttackRelease("A2", "8n");
      // bass.triggerAttackRelease(IVChord, "8n");
      if (priceDirection !== 0) {
        Tone.Transport.bpm.value = 250;
        console.log("Go neutral");
        stopAll();
        setPriceDirection(0);
        neutralPattern.start(0);
      }
    }

    // if price went down by a lot
  }, [props.data]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
      }}
    >
      <button
        onClick={() => {
          setStarted(!started);
          Tone.start();
          neutralPattern.start(0);
          kickDrum.volume.value = -1000;
          snareDrum.volume.value = -1000;
          kickPart.start(0);
          snarePart.start(0);
          hatPart.start(0);
          if (Tone.Transport.state !== "started") {
            Tone.Transport.start();
          } else {
            Tone.Transport.stop();
          }
          /*    kickPart.start(0);
          snarePart.start(0); */
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          kickDrum.volume.value = 0;
          snareDrum.volume.value = 0;
        }}
      >
        Start drums
      </button>
    </div>
  );
};

export default Synth;
