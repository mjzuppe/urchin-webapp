import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';

import bs58 from 'bs58';

// TODO: change that
const payer = Keypair.fromSecretKey(
  bs58.decode(
    '5CxcteLbaDghQn5EM6AssiPVPhL5DZrrKboXEN5h8PDJBoW4nNNxpxUAub2GaMMxppSucmZy9N4knppM9w9UHXVU'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
