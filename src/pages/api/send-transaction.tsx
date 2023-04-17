import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send(null);

  // Data is in req.body
  // Validation at this step

  res.status(200).json({ name: 'John Doe' })
};
