import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface PriceData {
  price: string;
  time: number;
  priceAsFloat: number;
}

export interface ChartDataState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  data: PriceData[];
  isPaused: boolean;
  firstPrice: PriceData | null;
}

const initialState: ChartDataState = {
  isEstablishingConnection: false,
  isConnected: false,
  data: [],
  isPaused: false,
  firstPrice: null,
};

const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    setChartData: (state, { payload }: { payload: PriceData[] }) => {
      state.data = payload;
    },
    setFirstPrice: (state, { payload }: { payload: PriceData }) => {
      state.firstPrice = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const actions = {
  ...chartDataSlice.actions,
};
export default chartDataSlice.reducer;
