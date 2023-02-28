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
  templates: [
    {
      inputs: [],
      taxonomies: [],
      id: id,
    },
  ],
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
  },
});

export const {
  addNewTemplate,
  deleteTemplate,
  setTemplatesEditorActiveTab,
  addNewTemplateInput,
  deleteTemplateInput,
} = slice.actions;

// Reducer
export default slice.reducer;
