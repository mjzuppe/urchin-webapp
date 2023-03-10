import { Keypair } from '@solana/web3.js';
// TODO: comment out when pushing to dev. Until pkg on npm
import urchin from 'urchin';
import bs58 from 'bs58';

const payer = Keypair.fromSecretKey(
  bs58.decode(
    '4X6qkYZcGwu5KtLMLUXhf3F17born5or7sQwd3pfcFzuUkds5MPu3tUZXziboUzFVPqFJyqJXRsBzCEBY5exeQb5'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
