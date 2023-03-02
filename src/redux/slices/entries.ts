import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../types/Entries';

interface EntriesState {
  entries: Array<Entry>;
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
    updateEntryInputs: (state, { payload }: PayloadAction<any>) => {
      const { entryIndex, inputs } = payload;
      state.entries[entryIndex].inputs = inputs;
    },
    addEntryTaxonomies: (state, { payload }: PayloadAction<any>) => {
      const { entryIndex, taxonomies } = payload;
      state.entries[entryIndex].taxonomies = taxonomies;
    },
  },
});

export const { addNewEntry, updateEntryInputs, addEntryTaxonomies } =
  slice.actions;

// Reducer
export default slice.reducer;
