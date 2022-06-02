import { Middleware } from "redux";
import { RootState } from ".";
import { actions, PriceData } from "./chartData";
import { actions as musVarActions } from "./musicVariables";
import * as _ from "lodash";
import { synthLead } from "../instruments/SynthLead";
import { pad } from "../instruments/Pad";
import { hatDrum } from "../instruments/Hat";
import { snareDrum } from "../instruments/Snare";
import { bassFilter } from "../instruments/Bass";
import Pluck from "../instruments/Pluck";

const MAX_LENGTH = 100;

const URL = "wss://stream.binance.com:9443/ws/btcusdt@aggTrade";
const client = new WebSocket(URL);

interface BinanceResponse {
  e: string;
  E: number;
  s: string;
  p: string;
  q: string;
  m: boolean;
  M: boolean;
  T: number;
}

const formatPrice = (price: string, priceOffset?: number) => {
  const priceAsFloat = parseFloat(price);
  let newPrice = priceAsFloat + (priceOffset || 0);
  return newPrice.toString();
};

const getAveragePrice = (data: PriceData[]) => {
  const prices = data.map((item) => item.priceAsFloat);
  const averagePrice = _.mean(prices);
  return averagePrice;
};

const chartMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!actions.startConnecting.match(action)) {
      return next(action);
    }

    let buffer: PriceData[] = [];

    const calculatePercentage = (last: string, first: string) => {
      if (!last || !first) return false;
      const diff = parseFloat(last) - parseFloat(first);
      const percentage = (diff / parseFloat(first)) * 1000;
      return percentage;
    };

    const dispatchData = (newData: PriceData[]) => {
      const { data } = store.getState().chartData;
      if (buffer.length > 0) {
        buffer = [];
      }
      const last = newData[newData.length - 1]?.price;
      const first = data[0]?.price;

      const perc = calculatePercentage(last, first);

      if (data.length >= MAX_LENGTH) {
        store.dispatch(
          actions.setChartData([
            ...store
              .getState()
              .chartData.data.slice(newData.length, data.length),
            ...newData,
          ])
        );
      } else {
        store.dispatch(actions.setChartData([...data, ...newData]));
      }
    };
    client.onopen = () => {
      console.log("connection established");
      store.dispatch(actions.connectionEstablished());
    };

    client.onerror = (e) => {
      console.log(e);
    };

    client.onmessage = (event) => {
      const data = JSON.parse(event.data) as BinanceResponse;

      const { firstPrice } = store.getState().chartData;
      if (firstPrice === null) {
        store.dispatch(
          actions.setFirstPrice({
            price: formatPrice(data.p),
            priceAsFloat: parseFloat(data.p),
            time: data.T,
          })
        );
        return;
      }
      const priceOffset =
        store.getState().debug.priceOffsetUp +
        store.getState().debug.priceOffsetDown;

      if (store.getState().chartData.data.length > 0) {
        const latestUpdate =
          store.getState().chartData.data[
            store.getState().chartData.data.length - 1
          ];

        const diff = data.T - latestUpdate.time;
        if (diff <= 10) {
          buffer = [
            ...buffer,
            {
              price: formatPrice(data.p, priceOffset),
              priceAsFloat: parseFloat(data.p),

              time: data.T,
            },
          ];
          return;
        }
      }

      dispatchData([
        ...buffer,
        {
          price: formatPrice(data.p, priceOffset),
          priceAsFloat: parseFloat(data.p),
          time: data.T,
        },
      ]);
    };

    next(action);
  };

export default chartMiddleware;
