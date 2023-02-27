type TemplateInput = {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'numeric' | 'file';
  options?: Array<string>;
  validateInputs: boolean;
  minLength?: number;
  maxLength?: number;
};

type TemplatesInputs = TemplateInput[];

export type { TemplatesInputs, TemplateInput };
