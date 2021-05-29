import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ValidKeys from '../types/ValidKeys';

export interface StartedState {
  started: boolean;
  openModal: string | null;
  keyBeingEdited: ValidKeys | null;
}

const initialState: StartedState = {
  started: false,
  openModal: null,
  keyBeingEdited: null,
};

export const startedSlice = createSlice({
  name: 'started',
  initialState,
  reducers: {
    setStarted: (state) => {
      state.started = true;
    },
    setOpenModal: (state, action: PayloadAction<string | null>) => {
      state.openModal = action.payload;
    },
    setKeyBeingEdited: (state, action: PayloadAction<ValidKeys | null>) => {
      state.keyBeingEdited = action.payload;
    },
  },
});

export const {
  setStarted,
  setOpenModal,
  setKeyBeingEdited,
} = startedSlice.actions;

export const isStarted = (state: RootState) => state.started.started;
export const openModal = (state: RootState) => state.started.openModal;
export const keyBeingEdited = (state: RootState) =>
  state.started.keyBeingEdited;

export default startedSlice.reducer;
