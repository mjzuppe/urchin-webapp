import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomies, Taxonomy, TaxonomyError} from '../../types/Taxonomies';

interface TaxonomiesState {
  taxonomies: Taxonomy[], 
  errors: TaxonomyError[],
  isPublishable: boolean;
}

const initialState: TaxonomiesState = {
  taxonomies: [], 
  errors: [],
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
    setTaxonomiesIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
    setTaxonomyErrors: (state, {payload}: PayloadAction<any>) => {
      const { publicKey, index, message } = payload
      let existingError = state.errors.filter( (error: { publicKey: any; }) => error.publicKey == publicKey)
      
      if( existingError.length == 0) {
        state.errors.push(
          {
            publicKey,
            index, 
            message
          }
        ) 
      }
    },
    removeTaxonomyErrors: (state, {payload}: PayloadAction<any>) => {
      const { publicKey } = payload
      let record = state.errors.filter((error: { publicKey: any; }) => error.publicKey == publicKey)

      if( record.length > 0  ) {
        state.errors.splice(state.errors.indexOf(record[0]), 1);
      }
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
  setTaxonomyErrors, 
  removeTaxonomyErrors
} = slice.actions;

// Reducer
export default slice.reducer;
