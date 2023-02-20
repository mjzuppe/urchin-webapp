import type { AppProps } from 'next/app';

// Styles
import '../styles/globals.scss';

// Fonts
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

// Components
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
