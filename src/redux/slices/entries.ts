import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../types/Entries';

interface EntriesState {
  entries: Array<Entry>;
  currentEntryId?: string;
  isPublishable: boolean;
}

const initialState: EntriesState = {
  entries: [],
  isPublishable: false,
};

const slice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addNewEntry: (state, action: PayloadAction<any>) => {
      state.entries.push(action.payload);
    },
    setCurrentEntryId: (state, { payload }: PayloadAction<any>) => {
      const currentEntryId = payload;
      state.currentEntryId = currentEntryId;
    },
    updateEntryInputs: (state, { payload }: PayloadAction<any>) => {
      const { entryIndex, inputs } = payload;
      state.entries[entryIndex].inputs = inputs;
    },
    addEntryTaxonomies: (state, { payload }: PayloadAction<any>) => {
      const { entryIndex, taxonomies } = payload;
      state.entries[entryIndex].taxonomies = taxonomies;
    },
    setIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
  },
});

export const {
  addNewEntry,
  updateEntryInputs,
  addEntryTaxonomies,
  setCurrentEntryId,
  setIsPublishable,
} = slice.actions;

// Reducer
export default slice.reducer;
