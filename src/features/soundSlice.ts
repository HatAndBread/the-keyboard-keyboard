import { ToneAudioBuffer } from "tone";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface SoundState {
  buffers: { [key: string]: ToneAudioBuffer };
}

const initialState: SoundState = {
  buffers: {},
};

export const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    setBuffers: (
      state,
      action: PayloadAction<{ [key: string]: ToneAudioBuffer }>
    ) => {
      state.buffers = action.payload;
    },
  },
});

export const { setBuffers } = soundSlice.actions;

export const buffers = (state: RootState) => state.sound.buffers;

export default soundSlice.reducer;
