import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomy } from '../../types/Taxonomies';
import connection from '../../utils/connection';

interface TaxonomiesState {
  // taxonomies: Array<Taxonomy>;
  taxonomies: any;
  isPublishable: boolean;
}

const initialState: TaxonomiesState = {
  taxonomies: [],
  isPublishable: false,
};

const slice = createSlice({
  name: 'taxonomies',
  initialState,
  reducers: {
    setTaxonomies: (state, { payload }: PayloadAction<any>) => {
      state.taxonomies = payload;
    },
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
    setIsPublishable: (state, { payload }: PayloadAction<any>) => {
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
  setIsPublishable,
} = slice.actions;

// Reducer
export default slice.reducer;
