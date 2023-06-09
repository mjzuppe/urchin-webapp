type TaxonomyError = {
  publicKey: string,
  index: number, 
  message: string
}

type Taxonomy = {
  label: string;
  parent?: string;
  grandParent?: string;
  updatedAt?: number;
  // solanaAddress: string;
  arweaveAddress?: string;
  publicKey: string;
};

type Taxonomies = Taxonomy[];

export type { Taxonomy, Taxonomies, TaxonomyError };
