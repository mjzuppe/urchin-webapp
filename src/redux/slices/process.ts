import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProcessState {
  currentProcess: string;
}

// Define the initial state using that type
const initialState: ProcessState = {
  currentProcess: 'default',
};

const slice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    setCurrentProcess(state, { payload }: PayloadAction<any>) {
      state.currentProcess = payload;
    },
  },
});

export const { setCurrentProcess } = slice.actions;

// Reducer
export default slice.reducer;
