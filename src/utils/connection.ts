import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';
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
