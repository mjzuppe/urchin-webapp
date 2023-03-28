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
      // refactor to look for new and edited 
      const { templateIndex, title } = payload;
      state.templates[templateIndex].title = title;
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
    removeTemplateErrors: (state, {payload}: PayloadAction<any>) => {
      const { publicKey } = payload
      let record = state.errors.filter((error: { publicKey: any; }) => error.publicKey == publicKey)

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
