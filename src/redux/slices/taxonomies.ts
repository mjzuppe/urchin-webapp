import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomies, Taxonomy, TaxonomyErrors} from '../../types/Taxonomies';

interface TaxonomiesState {
  original: Taxonomy[], 
  new: Taxonomy[], 
  edited: Taxonomy[], 
  errors: TaxonomyErrors[],
  isPublishable: boolean;
}

const initialState: TaxonomiesState = {
  original: [], 
  new: [], 
  edited: [], 
  errors: [],
  isPublishable: false,
};

const slice = createSlice({
  name: 'taxonomies',
  initialState,
  reducers: {
    setTaxonomies: (state, { payload }: PayloadAction<any>) => {
      state.original = payload;
    },
    addNewTaxonomy: (state, action: PayloadAction<any>) => {
      state.new.push(action.payload);
    },
    deleteTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { taxonomieIndex } = payload;
      state.original.splice(taxonomieIndex, 1);
    },
    updateTaxonomyLabel: (state, { payload }: PayloadAction<any>) => {
      const { label, index } = payload;
      // map through updated list taxonomies
      // if item exitsts update it 
      // else push new item into this array
      state.original[index].label = label;
    },
    updateTaxonomyParent: (state, { payload }: PayloadAction<any>) => {
      const { parent, index } = payload;
      state.original[index].parent = parent;
    },
    updateTaxonomyGrandParent: (state, { payload }: PayloadAction<any>) => {
      const { grandParent, index } = payload;
      state.original[index].grandParent = grandParent;
    },
    setTaxonomiesIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
  },
});

export const {
  setTaxonomies,
  addNewTaxonomy,
  deleteTaxonomy,
  updateTaxonomyLabel,
  updateTaxonomyParent,
  updateTaxonomyGrandParent,
  setTaxonomiesIsPublishable,
} = slice.actions;

// Reducer
export default slice.reducer;
