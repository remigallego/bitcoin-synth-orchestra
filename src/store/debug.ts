import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomNumberBetween } from "../utils/maths";

export interface DebugState {
  debugEnabled: boolean;
  priceOffsetUp: number;
  priceOffsetDown: number;
}

const initialState: DebugState = {
  debugEnabled: false,
  priceOffsetUp: 0,
  priceOffsetDown: 0,
};

const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    setDebugMode(state, { payload }: PayloadAction<boolean>) {
      state.debugEnabled = payload;
    },
    setPriceOffsetUp(state) {
      state.priceOffsetUp += randomNumberBetween(0, 20);
    },
    setPriceOffsetDown(state) {
      state.priceOffsetDown -= randomNumberBetween(0, 20);
    },
  },
});

export const actions = {
  ...debugSlice.actions,
};

export default debugSlice.reducer;
