type Entry = {
  id: string;
  updatedAt: number;
  solanaAddress: string;
  arweaveAddress: string;
  title: string;
  // metaDescription: string;
  // hero image
  // altText
  // post (rich text)
};

type Entries = Array<Entry>;

export type { Entry, Entries };
