import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';

import bs58 from 'bs58';

// TODO: change that
const payer = Keypair.fromSecretKey(
  bs58.decode(
    '5QA4FCiYuBfkizud8tRdUWomQqdvksJuSG5zY13uyHBPZP89Jb2LGWTNUcRuTUqJngwkG6xf7joRfo5jtLgfax1e'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
