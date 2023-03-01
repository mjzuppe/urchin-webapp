type Taxonomy = {
  label: string;
  parent: string;
  grandParent: string;
  updatedAt: number;
  solanaAddress: string;
  arweaveAddress: string;
};

type Taxonomies = Taxonomy[];

export type { Taxonomy, Taxonomies };
