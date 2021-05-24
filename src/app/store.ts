import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import startedReducer from "../features/startedSlice";
import soundReducer from "../features/soundSlice";

export const store = configureStore({
  reducer: {
    started: startedReducer,
    sound: soundReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
