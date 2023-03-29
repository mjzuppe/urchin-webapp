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
    purgeTemplatesNew: (state) => {
      state.new = [];
    },
    deleteTemplate: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, publicKey } = payload;
      if (templateIndex >= state.templates.length) {
        state.new.forEach((newTemplate, index) => {
          if (newTemplate.publicKey === publicKey) {
            state.new.splice(index, 1);
          }
        });
      } else {
        state.edited.forEach((editedTemplate, index) => {
          if (editedTemplate.publicKey === publicKey) {
            state.new.splice(index, 1);
          } else {
            // handle deleted templates loaded from api
          }
        });
      }
    },
    addOrUpdateTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, inputs, id } = payload;

      if (templateIndex >= state.templates.length) {
        state.new.forEach((newTemplate) => {
          if (newTemplate.id === id) {
            newTemplate.inputs = inputs;
          }
        });
      } else {
        if (inputs !== state.templates[templateIndex].inputs) {
          if (state.edited.length == 0) {
            state.edited.push({ ...state.templates[templateIndex] });
            state.edited[state.edited.length - 1].inputs = inputs;
          } else {
            let editedTemplateIndex = state.edited.findIndex(
              (template) => template.id == id
            );
            if (
              editedTemplateIndex !== -1 &&
              state.edited[editedTemplateIndex]
            ) {
              state.edited[editedTemplateIndex].inputs = inputs;
            } else {
              state.edited.push({ ...state.templates[templateIndex] });
              state.edited[state.edited.length - 1].inputs = inputs;
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if (record.id == id) {
              state.edited.splice(index, 1);
            }
          });
        }
      }
    },
    addOrUpdateTemplateTitle: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, title, id } = payload;

      if (templateIndex >= state.templates.length) {
        state.new.forEach((newTemplate) => {
          if (newTemplate.id === id) {
            newTemplate.title = title;
          }
        });
      } else {
        if (title !== state.templates[templateIndex].title) {
          if (state.edited.length == 0) {
            state.edited.push({ ...state.templates[templateIndex] });
            state.edited[state.edited.length - 1].title = title;
          } else {
            let editedTemplateIndex = state.edited.findIndex(
              (template) => template.id == id
            );
            if (
              editedTemplateIndex !== -1 &&
              state.edited[editedTemplateIndex]
            ) {
              state.edited[editedTemplateIndex].title = title;
            } else {
              state.edited.push({ ...state.templates[templateIndex] });
              state.edited[state.edited.length - 1].title = title;
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if (record.id == id) {
              state.edited.splice(index, 1);
            }
          });
        }
      }
    },
    deleteTemplateInput: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, inputIndex, id } = payload;
      if (templateIndex >= state.templates.length) {
        state.new.forEach((newTemplate, index) => {
          if (newTemplate.id === id) {
            state.new[index].inputs.splice(inputIndex, 1);
          }
        });
      } else {
        state.edited.forEach((editedTemplate, index) => {
          if (editedTemplate.id === id) {
            state.edited[index].inputs.splice(inputIndex, 1);
          } else {
            // handle deleted templates loaded from api
          }
        });
      }
    },
    addNewTemplateTaxonomy: (state, { payload }: PayloadAction<any>) => {
      const { templateIndex, taxonomies, id } = payload;
      if (templateIndex >= state.templates.length) {
        state.new.forEach((newTemplate) => {
          if (newTemplate.id === id) {
            newTemplate.taxonomies = taxonomies;
          }
        });
      } else {
        if (
          JSON.stringify(taxonomies) !==
          JSON.stringify(state.templates[templateIndex].taxonomies)
        ) {
          if (state.edited.length == 0) {
            state.edited.push({ ...state.templates[templateIndex] });
            state.edited[state.edited.length - 1].taxonomies = taxonomies;
          } else {
            let editedTemplateIndex = state.edited.findIndex(
              (template) => template.id == id
            );
            if (
              editedTemplateIndex !== -1 &&
              state.edited[editedTemplateIndex]
            ) {
              state.edited[editedTemplateIndex].taxonomies = taxonomies;
            } else {
              state.edited.push({ ...state.templates[templateIndex] });
              state.edited[state.edited.length - 1].taxonomies = taxonomies;
            }
          }
        } else {
          state.edited.forEach((record, index) => {
            if (record.id == id) {
              state.edited.splice(index, 1);
            }
          });
        }
      }
    },
    setTemplateIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
    updateTemplateErrors: (state, { payload }: PayloadAction<any>) => {
      const { id, index, message } = payload;
      let existingError = state.errors.filter(
        (error: { id: string }) => error.id == id
      );

      if (existingError.length == 0) {
        state.errors.push({
          id,
          index,
          message,
        });
      }
    },
    removeTemplateErrors: (state, { payload }: PayloadAction<any>) => {
      const { id } = payload;
      let record = state.errors.filter((error: { id: any }) => error.id == id);

      if (record.length > 0) {
        state.errors.splice(state.errors.indexOf(record[0]), 1);
      }
    },
  },
});

export const {
  setTemplates,
  addNewTemplate,
  purgeTemplatesNew,
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
