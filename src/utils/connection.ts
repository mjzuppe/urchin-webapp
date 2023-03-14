import { Keypair } from '@solana/web3.js';
import urchin from 'urchin-web3-cms';

import bs58 from 'bs58';

// TODO: change that
const payer = Keypair.fromSecretKey(
  bs58.decode(
    'JXepqbA3N2vcixpfuiLwCe1katXPF9cqU6GeUHEoBgEHJFsdpNXma7EwQsC1GSbmx8uczzNYCV98Svh1vNrnAPx'
  )
);
const connection = urchin({
  payer,
  cluster: 'devnet',
});
// console.log('connection', connection);

export default connection;
