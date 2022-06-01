import { createContext, useState } from "react";

export interface PriceData {
  data: {
    price: string;
    time: number;
  }[];
  debugUpOnly: boolean;
  debugDownOnly: boolean;
  debugPriceGoUp: () => void;
  debugPriceGoDown: () => void;
  setPause: () => void;
}

export const initialState: PriceData = {
  data: [],
  debugUpOnly: false,
  debugDownOnly: false,
  debugPriceGoUp: () => {},
  setPause: () => {},
  debugPriceGoDown: () => {},
};

const PriceDataContext = createContext<PriceData>(initialState);

export default PriceDataContext;
