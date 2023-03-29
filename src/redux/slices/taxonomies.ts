import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomies, Taxonomy, TaxonomyError} from '../../types/Taxonomies';

interface TaxonomiesState {
  taxonomies: Array<Taxonomy>;
  new: Array<Taxonomy>;
  edited: Array<Taxonomy>;
  errors: TaxonomyError[];
  isPublishable: boolean;
}

const initialState: TaxonomiesState = {
  taxonomies: [],
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
      state.taxonomies = payload;
    },
    addNewTaxonomy: (state, action: PayloadAction<any>) => {
      state.new.push(action.payload);
    },
    deleteTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { taxonomieIndex, publicKey } = payload;
      if( taxonomieIndex >= state.taxonomies.length ) { 
        state.new.forEach((newTaxo, index) => {
          if(newTaxo.publicKey === publicKey) {
            state.new.splice(index, 1);
          } 
        })
      } else {
        state.edited.forEach((editedTaxo, index) => {
          if(editedTaxo.publicKey === publicKey) {
            state.new.splice(index, 1);
          } else {
            // handle deleted taxonomies 
          }
        })
      }
    },
    updateTaxonomyLabel: (state, { payload }: PayloadAction<any>) => {
      const { label, index, publicKey } = payload;
      if( index >= state.taxonomies.length ) { 
        state.new.forEach((newTaxo) => {
          if(newTaxo.publicKey === publicKey) {
            newTaxo.label = label
          } 
        })
      } 
      else {
        if(label !== state.taxonomies[index].label) {
          if(state.edited.length == 0) {  
            state.edited.push({...state.taxonomies[index]})
            state.edited[state.edited.length - 1].label = label
          } 
          else {
            let editedTaxonomyIndex = state.edited.findIndex(taxonomy => taxonomy.publicKey == publicKey)
            if(editedTaxonomyIndex !== -1 && state.edited[editedTaxonomyIndex]) {
              state.edited[editedTaxonomyIndex].label = label
            } else {
              state.edited.push({...state.taxonomies[index]})
              state.edited[state.edited.length - 1].label = label
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if(record.publicKey == publicKey) {
              state.edited.splice(index, 1);
            }
          })
        }
      }
    },
    updateTaxonomyParent: (state, { payload }: PayloadAction<any>) => {
      const { parent, index, publicKey } = payload;
      if( index > state.taxonomies.length ) { 
        state.new.forEach((newTaxo) => {
          if(newTaxo.publicKey === publicKey) {
            newTaxo.parent = parent
          } 
        })
      } 
      else {
        if(parent !== state.taxonomies[index].parent) {
          if(state.edited.length == 0) {  
            state.edited.push({...state.taxonomies[index]})
            state.edited[state.edited.length - 1].parent = parent
          } 
          else {
            let editedTaxonomyIndex = state.edited.findIndex(taxonomy => taxonomy.publicKey == publicKey)
            if(editedTaxonomyIndex !== -1 && state.edited[editedTaxonomyIndex]) {
              state.edited[editedTaxonomyIndex].parent = parent
            } else {
              state.edited.push({...state.taxonomies[index]})
              state.edited[state.edited.length - 1].parent = parent
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if(record.publicKey == publicKey) {
              state.edited.splice(index, 1);
            }
          })
        }
      }
    },
    updateTaxonomyGrandParent: (state, { payload }: PayloadAction<any>) => {
      const { grandParent, index, publicKey } = payload;
      if( index > state.taxonomies.length ) { 
        state.new.forEach((newTaxo) => {
          if(newTaxo.publicKey === publicKey) {
            newTaxo.grandParent = grandParent
          } 
        })
      } 
      else {
        if(grandParent !== state.taxonomies[index].grandParent) {
          if(state.edited.length == 0) {  
            state.edited.push({...state.taxonomies[index]})
            state.edited[state.edited.length - 1].grandParent = grandParent
          } 
          else {
            let editedTaxonomyIndex = state.edited.findIndex(taxonomy => taxonomy.publicKey == publicKey)
            if(editedTaxonomyIndex !== -1 && state.edited[editedTaxonomyIndex]) {
              state.edited[editedTaxonomyIndex].grandParent = grandParent
            } else {
              state.edited.push({...state.taxonomies[index]})
              state.edited[state.edited.length - 1].grandParent = grandParent
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if(record.publicKey == publicKey) {
              state.edited.splice(index, 1);
            }
          })
        }
      }
    },
    setTaxonomiesIsPublishable: (state, { payload }: PayloadAction<any>) => {
      console.log("IS PUBLISHABLE::", payload)
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
