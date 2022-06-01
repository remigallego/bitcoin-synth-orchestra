import { FunctionComponent, useEffect, useState } from "react";
import PriceDataContext, { initialState, PriceData } from "./PriceDataContext";
interface Props {
  children: React.ReactNode;
}
const client = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@aggTrade"
);

interface Response {
  e: string;
  E: number;
  s: string;
  p: string;
  q: string;
  m: boolean;
  M: boolean;
  T: number;
}

const PriceDataProvider: FunctionComponent<Props> = (props) => {
  const [priceData, setPriceData] = useState<PriceData>(initialState);
  const [debugPriceGoDown, setPriceGoDown] = useState(0);
  const [debugPriceGoUp, setPriceGoUp] = useState(0);
  const [pause, setPause] = useState(false);

  priceData.debugPriceGoDown = () => {
    setPriceGoDown(debugPriceGoDown + 1);
  };
  priceData.debugPriceGoUp = () => {
    setPriceGoUp(debugPriceGoUp + 1);
  };
  priceData.setPause = () => {
    setPause(!pause);
  };

  client.onopen = () => {
    console.log("connected");
  };

  const setPrice = (price: string) => {
    const priceAsFloat = parseFloat(price);
    let newPrice = priceAsFloat;
    newPrice -= 50 * debugPriceGoDown;
    newPrice += 50 * debugPriceGoUp;

    return newPrice.toString();
  };
  client.onmessage = (event) => {
    if (pause) return;
    const data = JSON.parse(event.data) as Response;
    if (data.s === "BTCUSDT") {
      setPriceData({
        ...priceData,
        data: [
          ...priceData.data,
          {
            price: setPrice(data.p),
            time: data.T,
          },
        ],
      });
      if (priceData.data.length >= 2000) {
        setPriceData({
          ...priceData,
          data: [
            ...priceData.data.slice(1, priceData.data.length),
            {
              price: setPrice(data.p),
              time: data.T,
            },
          ],
        });
      }
    }
  };
  client.onclose = () => {
    console.log("disconnected");
  };

  return (
    <PriceDataContext.Provider value={priceData}>
      {props.children}
    </PriceDataContext.Provider>
  );
};

export default PriceDataProvider;
