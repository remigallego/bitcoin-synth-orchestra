import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface PriceData {
  price: string;
  time: number;
}

export interface MusicVariablesState {
  direction: number;
}

const initialState: MusicVariablesState = {
  direction: 0,
};

const musicVariablesSlice = createSlice({
  name: "musicVariables",
  initialState,
  reducers: {
    setDirection: (state, { payload }: { payload: number }) => {
      state.direction = payload;
    },
  },
});

export const actions = {
  ...musicVariablesSlice.actions,
};
export default musicVariablesSlice.reducer;
