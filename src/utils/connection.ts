import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';

import bs58 from 'bs58';

// TODO: change that
const payer = Keypair.fromSecretKey(
  bs58.decode(
    '3YNWe72jopyTiJWtRBWTGVkyYb3VtxBfqJ1yaonKfJNwLaTWWL89fMDaswTXX1CJQoFypHkdW4AmfuwhpUc1RwP6'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
