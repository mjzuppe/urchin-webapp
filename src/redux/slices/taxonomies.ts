import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaxonomiesState {
  taxonomies: Array<Taxonomies>;
}
interface Taxonomies {
  label: string;
  parent: string;
}

// Define the initial state using that type
const initialState: TaxonomiesState = {
  taxonomies: [
    {
      label: '',
      parent: '',
    },
  ],
};

const slice = createSlice({
  name: 'taxonomies',
  initialState,
  reducers: {
    addNewTaxonomy: (state, action: PayloadAction<any>) => {
      state.taxonomies.push(action.payload);
    },
    deleteTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { taxonomieIndex } = payload;
      state.taxonomies.splice(taxonomieIndex, 1);
    },
    updateTaxonomyLabel: (state, { payload }) => {
      const { label, index } = payload;
      state.taxonomies[index].label = label;
    },
    updateTaxonomyParent: (state, { payload }) => {
      const { parent, index } = payload;
      state.taxonomies[index].parent = parent;
    },
  },
});

export const {
  addNewTaxonomy,
  deleteTaxonomy,
  updateTaxonomyLabel,
  updateTaxonomyParent,
} = slice.actions;

// Reducer
export default slice.reducer;
