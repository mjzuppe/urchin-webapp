import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomies, Taxonomy, TaxonomyErrors} from '../../types/Taxonomies';

interface TaxonomiesState {
  original: Taxonomy[], 
  errors: any,
  isPublishable: boolean;
}

const initialState: TaxonomiesState = {
  original: [], 
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
      state.original.push(action.payload);
    },
    deleteTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { taxonomieIndex } = payload;
      state.original.splice(taxonomieIndex, 1);
    },
    updateTaxonomyLabel: (state, { payload }: PayloadAction<any>) => {
      const { label, index } = payload;
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
    setTaxonomyErrors: (state, {payload}: PayloadAction<any>) => {
      const { publicKey, duplicateRecord, index, message } = payload
      let existingError = state.errors.filter( (error: { publicKey: any; }) => error.publicKey == publicKey)
      
      if( existingError.length == 0) {
        state.errors.push(
          {
            publicKey,
            duplicateRecord,
            index, 
            message
          }
        ) 
      }
    },
    removeTaxonomyErrors: (state, {payload}: PayloadAction<any>) => {
      const { publicKey } = payload
      let record = state.errors.filter((error: { publicKey: any; }) => error.publicKey == publicKey)
      let duplicatePairRecord = state.errors.filter((error: { duplicateRecord: any; }) => error.duplicateRecord == publicKey)

      if( record.length > 0 && duplicatePairRecord.length > 0 ) {
        state.errors.splice(state.errors.indexOf(record), 1);
        state.errors.splice(state.errors.indexOf(duplicatePairRecord), 1);
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
