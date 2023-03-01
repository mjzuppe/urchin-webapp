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
  id: string;
  title: string;
  updatedAt: number;
  solanaAddress: string;
  arweaveAddress: string;
  entriesNbr: number;
  inputs: TemplatesInputs;
  taxonomies?: Array<TemplatesTaxonomies>;
};

type TemplatesInputs = TemplateInput[];

export type { Templates, TemplatesInputs, TemplateInput, TemplatesTaxonomies };
