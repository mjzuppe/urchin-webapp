import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Templates } from '../../types/Templates';

interface TemplatesState {
  templates: Array<Templates>;
  templatesEditorActiveTab: string;
  currentTemplateId?: string;
  isPublishable: boolean;
}

const initialState: TemplatesState = {
  templates: [],
  templatesEditorActiveTab: 'Inputs',
  isPublishable: false,
};

const slice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplatesEditorActiveTab(state, { payload }: PayloadAction<any>) {
      state.templatesEditorActiveTab = payload;
    },
    setCurrentTemplateId: (state, { payload }: PayloadAction<any>) => {
      const currentTemplateId = payload;
      state.currentTemplateId = currentTemplateId;
    },

    addNewTemplate: (state, action: PayloadAction<any>) => {
      state.templates.push(action.payload);
    },
    deleteTemplate: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex } = payload;
      state.templates.splice(templateIndex, 1);
    },
    addOrUpdateTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, input } = payload;
      state.templates[templateIndex].inputs = input;
    },
    addOrUpdateTemplateTitle: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, title } = payload;
      state.templates[templateIndex].title = title;
    },
    deleteTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, inputIndex } = payload;
      state.templates[templateIndex].inputs.splice(inputIndex, 1);
    },
    addNewTemplateTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, taxonomy } = payload;
      state.templates[templateIndex].taxonomies = taxonomy;
    },
    setIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
  },
});

export const {
  addNewTemplate,
  deleteTemplate,
  setCurrentTemplateId,
  setTemplatesEditorActiveTab,
  addOrUpdateTemplateInput,
  addOrUpdateTemplateTitle,
  deleteTemplateInput,
  addNewTemplateTaxonomy,
  setIsPublishable,
} = slice.actions;

// Reducer
export default slice.reducer;
