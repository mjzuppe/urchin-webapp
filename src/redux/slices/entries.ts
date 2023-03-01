import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entries } from '../../types/Entries';

interface EntriesState {
  entries: Array<Entries>;
}

const initialState: EntriesState = {
  entries: [],
};

const slice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addNewEntry: (state, action: PayloadAction<any>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addNewEntry } = slice.actions;

// Reducer
export default slice.reducer;
