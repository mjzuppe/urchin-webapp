type TaxonomyErrors = {
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

type Taxonomies = {
  original: Taxonomy[], 
  new: Taxonomy[], 
  edited: Taxonomy[], 
  errors: TaxonomyErrors[]
};

export type { Taxonomy, Taxonomies, TaxonomyErrors };
