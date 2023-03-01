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
    updateEntryTitle: (state, { payload }: PayloadAction<any>) => {
      const { title, index } = payload;
      state.entries[index].title = title;
    },
    updateEntryMetaDescription: (state, { payload }: PayloadAction<any>) => {
      const { metaDescription, index } = payload;
      state.entries[index].metaDescription = metaDescription;
    },
  },
});

export const { addNewEntry, updateEntryTitle, updateEntryMetaDescription } =
  slice.actions;

// Reducer
export default slice.reducer;
