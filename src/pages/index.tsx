import { NextPage } from 'next';
import Head from 'next/head';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';

// redux

import { useAppSelector } from 'src/utils/useAppSelector';

// Components
import Subnav from 'src/components/subnav';
import TemplatesList from '@/components/templatesList';
import EntriesList from '@/components/entriesList';
import TaxonomiesList from '@/components/taxonomiesList';

const Home: NextPage = (): JSX.Element => {
  const { publicKey, connected } = useWallet();
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);

  return (
    <>
      <Head>
        <title>Playa - WebApp</title>
      </Head>

      {/* Wallet not connected */}
      {!connected && <h1>Static HOME PAGE</h1>}
      {/* Wallet connected */}
      {connected && (
        <>
          <Subnav />
          {/* render component based on active tab */}
          {activeTab === 'Templates' && <TemplatesList />}
          {activeTab === 'Entries' && <EntriesList />}
          {activeTab === 'Taxonomies' && <TaxonomiesList />}
        </>
      )}
    </>
  );
};

// Use SSG here to get the data at build time
export default Home;
