import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chartData, { actions } from "./chartData";
import chartMiddleware from "./chartMiddleware";
import debug from "./debug";
import synthMiddleware from "./middlewares/synthMiddleware";
import musicVariables from "./musicVariables";

const rootReducer = combineReducers({
  chartData,
  debug,
  musicVariables,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [chartMiddleware, synthMiddleware],
});

store.dispatch(actions.startConnecting());

export type RootState = ReturnType<typeof rootReducer>;
