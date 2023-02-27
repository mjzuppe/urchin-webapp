import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplatesInputs } from '../../types/TemplatesInputs';

interface TemplatesState {
  templates: Array<Templates>;
  templatesEditorActiveTab: string;
}

interface Templates {
  inputs: TemplatesInputs;
  taxonomies?: Array<TemplatesTaxonomies>;
  id: string;
}

interface TemplatesTaxonomies {
  label: string;
  parent: string | null;
}

// Define the initial state using that type
const initialState: TemplatesState = {
  templates: [
    {
      inputs: [],
      taxonomies: [],
      id: '1',
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
  },
});

export const { addNewTemplate, deleteTemplate, setTemplatesEditorActiveTab } =
  slice.actions;

// Reducer
export default slice.reducer;
