import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export interface StartedState{
  started: boolean
}

const initialState: StartedState = {
  started: false
}

export const startedSlice = createSlice({
  name: 'started',
  initialState,
  reducers: {
    setStarted: (state)=>{
      state.started = true;
    }
  }
})

export const {setStarted} = startedSlice.actions;

export const isStarted = (state: RootState) => state.started.started

export default startedSlice.reducer;