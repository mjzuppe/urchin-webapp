import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';

import bs58 from 'bs58';

// TODO: change that
const payer = Keypair.fromSecretKey(
  bs58.decode(
    '5wuVvkeEgyn9kPCSmJVHtop2pga6c9MNjnuaCvi8Ak5um4hqGEatE9va59pkGzUhMjt6o5RxTAQG5PPEJtxQYYEp'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
