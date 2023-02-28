type TemplateInput = {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'numeric' | 'file';
  options?: Array<string>;
  validateInputs: boolean;
  minLength?: number;
  maxLength?: number;
};

type TemplatesTaxonomies = {
  label: string;
  parent: string | null;
};

type Templates = {
  inputs: TemplatesInputs;
  taxonomies?: Array<TemplatesTaxonomies>;
  id: string;
};

type TemplatesInputs = TemplateInput[];

export type { Templates, TemplatesInputs, TemplateInput, TemplatesTaxonomies };
