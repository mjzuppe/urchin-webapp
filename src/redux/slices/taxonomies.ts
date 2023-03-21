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
      // assign temporary public keys that get removed later? 
      // or use lookup by labels 
      state.new.push(action.payload);
    },
    deleteTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { taxonomieIndex } = payload;
      state.original.splice(taxonomieIndex, 1);
    },
    updateTaxonomyLabel: (state, { payload }: PayloadAction<any>) => {
      const { label, index, publicKey } = payload;
      // use index to find taxonomy in original array 
      let originalTaxonomy = state.original[index]
      // check if that taxonomy exists in edited 
      if( originalTaxonomy !== null || originalTaxonomy !== undefined ) {
        state.edited.forEach((editedTaxo, index) => {
          if(editedTaxo.publicKey === originalTaxonomy.publicKey) {
            state.edited[index].label = label
          } else {
            state.edited.push(originalTaxonomy)
            state.edited[state.edited.length - 1].label = label
          }
        })
      } else {
        // we always add new items at the end of the list 
        state.new.forEach((newTaxo) => {
          if(newTaxo.publicKey === publicKey) {
            newTaxo.label = label
          } 
        })
      }
      // if not push it there 
      // else override it with new info
      console.log(payload)
      return 
      state.edited[index].label = label;
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
