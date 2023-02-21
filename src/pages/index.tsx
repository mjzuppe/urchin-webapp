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
import StaticHomePage from '@/components/staticHomePage';

const Home: NextPage = (): JSX.Element => {
  const { publicKey, connected } = useWallet();
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);

  return (
    <>
      <Head>
        <title>Playa - WebApp</title>
      </Head>
      {/* Wallet not connected */}
      {!connected && <StaticHomePage />}
      {/* Wallet connected */}
      {connected && (
        <>
          <Subnav />
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
