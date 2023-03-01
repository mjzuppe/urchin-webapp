import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomy } from '../../types/Taxonomies';

interface TaxonomiesState {
  taxonomies: Array<Taxonomy>;
}

// Define the initial state using that type
const initialState: TaxonomiesState = {
  taxonomies: [
    // {
    //   label: '',
    //   parent: '',
    //   grandParent: '',
    //   updatedAt: 0,
    //   solanaAddress: 'string',
    //   arweaveAddress: 'string',
    // },
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
    updateTaxonomyLabel: (state, { payload }: PayloadAction<any>) => {
      const { label, index } = payload;
      state.taxonomies[index].label = label;
    },
    updateTaxonomyParent: (state, { payload }: PayloadAction<any>) => {
      const { parent, index } = payload;
      state.taxonomies[index].parent = parent;
    },
    updateTaxonomyGrandParent: (state, { payload }: PayloadAction<any>) => {
      const { grandParent, index } = payload;
      state.taxonomies[index].grandParent = grandParent;
    },
  },
});

export const {
  addNewTaxonomy,
  deleteTaxonomy,
  updateTaxonomyLabel,
  updateTaxonomyParent,
  updateTaxonomyGrandParent,
} = slice.actions;

// Reducer
export default slice.reducer;
