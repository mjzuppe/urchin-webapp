import type { Taxonomies } from './Taxonomies';

type Entry = {
  id: string;
  updatedAt: number;
  solanaAddress: string;
  arweaveAddress: string;
  title: string;
  taxonomies: Array<Taxonomies>;
  template: string;
  inputs: Array<string>;
};

type Entries = Array<Entry>;

export type { Entry, Entries };
