type Taxonomy = {
  label: string;
  parent: string;
  grandParent: string;
};

type Taxonomies = Taxonomy[];

export type { Taxonomy, Taxonomies };
