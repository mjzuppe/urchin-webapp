import { Taxonomy } from './Taxonomies';

type TemplateInput = {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'numeric' | 'file';
  options?: Array<string>;
  validateInputs: boolean;
  minLength?: number;
  maxLength?: number;
};

type Templates = {
  id: string;
  title: string;
  updatedAt: number;
  publicKey: string;
  arweaveAddress: string;
  entriesNbr: number;
  inputs: TemplatesInputs;
  taxonomies?: Array<Taxonomy>;
};

type TemplatesInputs = TemplateInput[];

export type { Templates, TemplatesInputs, TemplateInput };
