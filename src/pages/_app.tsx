import type { AppProps } from 'next/app';
import { useMemo } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Styles
import '../styles/globals.scss';

// Fonts
import { Inter } from '@next/font/google';
const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
});

// Components
import Layout from '../components/layout';

// Wallet Provider
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  BackpackWalletAdapter,
  BitKeepWalletAdapter,
  BitpieWalletAdapter,
  BraveWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  CoinhubWalletAdapter,
  ExodusWalletAdapter,
  GlowWalletAdapter,
  HuobiWalletAdapter,
  HyperPayWalletAdapter,
  KeystoneWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  NufiWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SaifuWalletAdapter,
  SalmonWalletAdapter,
  SkyWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  // WALLET ADAPTER
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = process.env
    .NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new BitKeepWalletAdapter(),
      new BitpieWalletAdapter(),
      new BraveWalletAdapter(),
      new CloverWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinbaseWalletAdapter(),
      new CoinhubWalletAdapter(),
      new ExodusWalletAdapter(),
      new GlowWalletAdapter(),
      new HuobiWalletAdapter(),
      new HyperPayWalletAdapter(),
      new KeystoneWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new NekoWalletAdapter(),
      new NightlyWalletAdapter(),
      new NufiWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SaifuWalletAdapter(),
      new SalmonWalletAdapter(),
      new SkyWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new SolongWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );
  return (
    <div className={inter.className}>
      <Provider store={store}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Provider>
    </div>
  );
}
