import type { Taxonomies } from './Taxonomies';

type Entry = {
  id: string;
  updatedAt: number;
  publicKey: string;
  arweaveAddress: string;
  title: string;
  taxonomies: Array<Taxonomies>;
  template: string;
  inputs: Array<any>;
};

type Entries = Array<Entry>;

export type { Entry, Entries };
