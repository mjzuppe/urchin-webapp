import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Templates } from '../../types/Templates';
import { v4 as uuidv4 } from 'uuid';

interface TemplatesState {
  templates: Array<Templates>;
  templatesEditorActiveTab: string;
}

let id = uuidv4();

// Define the initial state using that type
const initialState: TemplatesState = {
  templates: [],
  templatesEditorActiveTab: 'Inputs',
};

const slice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplatesEditorActiveTab(state, { payload }: PayloadAction<any>) {
      state.templatesEditorActiveTab = payload;
    },
    addNewTemplate: (state, action: PayloadAction<any>) => {
      state.templates.push(action.payload);
    },
    deleteTemplate: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex } = payload;
      state.templates.splice(templateIndex, 1);
    },
    addNewTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, input } = payload;
      state.templates[templateIndex].inputs = input;
    },
    deleteTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, inputIndex } = payload;
      state.templates[templateIndex].inputs.splice(inputIndex, 1);
    },
    addNewTemplateTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, taxonomy } = payload;
      state.templates[templateIndex].taxonomies = taxonomy;
    },
  },
});

export const {
  addNewTemplate,
  deleteTemplate,
  setTemplatesEditorActiveTab,
  addNewTemplateInput,
  deleteTemplateInput,
  addNewTemplateTaxonomy,
} = slice.actions;

// Reducer
export default slice.reducer;
