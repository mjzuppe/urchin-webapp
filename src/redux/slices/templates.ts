import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Templates, TemplateError } from '../../types/Templates';

interface TemplatesState {
  templates: Array<Templates>;
  new: Array<Templates>;
  edited: Array<Templates>;
  errors: TemplateError[];
  templatesEditorActiveTab: string;
  currentTemplateId?: string;
  isPublishable: boolean;
}

const initialState: TemplatesState = {
  templates: [],
  new: [],
  edited: [], 
  errors: [], 
  templatesEditorActiveTab: 'Inputs',
  isPublishable: false,
};

const slice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplates: (state, { payload }: PayloadAction<any>) => {
      state.templates = payload;
    },
    setTemplatesEditorActiveTab(state, { payload }: PayloadAction<any>) {
      state.templatesEditorActiveTab = payload;
    },
    setCurrentTemplateId: (state, { payload }: PayloadAction<any>) => {
      const currentTemplateId = payload;
      state.currentTemplateId = currentTemplateId;
    },

    addNewTemplate: (state, action: PayloadAction<any>) => {
      state.new.push(action.payload);
    },
    deleteTemplate: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, publicKey } = payload;
      if( templateIndex >= state.templates.length ) { 
        state.new.forEach((newTemplate, index) => {
          if(newTemplate.publicKey === publicKey) {
            state.new.splice(index, 1);
          } 
        })
      } else {
        state.edited.forEach((editedTemplate, index) => {
          if(editedTemplate.publicKey === publicKey) {
            state.new.splice(index, 1);
          } else {
            // handle deleted templates loaded from api
          }
        })
      }
    },
    addOrUpdateTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, input } = payload;
      // refactor to look for new and edited 
      // this implementation is currently broken
      state.templates[templateIndex].inputs = input;
    },
    addOrUpdateTemplateTitle: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, title, id } = payload;

      console.log(templateIndex)
      console.log(title)
      console.log(id)
      if( templateIndex >= state.templates.length ) { 
        state.new.forEach((newTemplate) => {
          if(newTemplate.id === id) {
            newTemplate.title = title
          } 
        })
      } 
      else {
        if(title !== state.templates[templateIndex].title) {
          if(state.edited.length == 0) {  
            state.edited.push({...state.templates[templateIndex]})
            state.edited[state.edited.length - 1].title = title
          } 
          else {
            let editedTemplateIndex = state.edited.findIndex(taxonomy => taxonomy.id == id)
            if(editedTemplateIndex !== -1 && state.edited[editedTemplateIndex]) {
              state.edited[editedTemplateIndex].title = title
            } else {
              state.edited.push({...state.templates[templateIndex]})
              state.edited[state.edited.length - 1].title = title
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if(record.id == id) {
              state.edited.splice(index, 1);
            }
          })
        }
      }
    },
    deleteTemplateInput: (state, { payload }: PayloadAction<any>) => {
      // refactor to look for new and edited 
      const { templateIndex, inputIndex } = payload;
      state.templates[templateIndex].inputs.splice(inputIndex, 1);
    },
    addNewTemplateTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, taxonomy } = payload;
      // refactor to look for new and edited and not update original
      state.templates[templateIndex].taxonomies = taxonomy;
    },
    setTemplateIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
    updateTemplateErrors: (state, {payload}: PayloadAction<any>) => {
      const { id, index, message } = payload
      let existingError = state.errors.filter( (error: { id: string; }) => error.id == id)
      
      if( existingError.length == 0) {
        state.errors.push(
          {
            id,
            index, 
            message
          }
        ) 
      }
    },
    removeTemplateErrors: (state, {payload}: PayloadAction<any>) => {
      const { id } = payload
      let record = state.errors.filter((error: { id: any; }) => error.id == id)

      if( record.length > 0  ) {
        state.errors.splice(state.errors.indexOf(record[0]), 1);
      }
    },
  },
});

export const {
  setTemplates,
  addNewTemplate,
  deleteTemplate,
  setCurrentTemplateId,
  setTemplatesEditorActiveTab,
  addOrUpdateTemplateInput,
  addOrUpdateTemplateTitle,
  deleteTemplateInput,
  addNewTemplateTaxonomy,
  setTemplateIsPublishable,
  updateTemplateErrors,
  removeTemplateErrors,
} = slice.actions;

// Reducer
export default slice.reducer;
