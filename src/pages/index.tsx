import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';

// redux
import { setCurrentProcess } from '../redux/slices/process';

// Utils
import { useAppSelector } from '../utils/useAppSelector';
import { useAppDispatch } from '../utils/useAppDispatch';

// Components
import Subnav from '../components/subnav';
import TemplatesList from '../components/templatesList';
import EntriesList from '../components/entriesList';
import TaxonomiesList from '../components/taxonomiesList';
import StaticHomePage from '../components/staticHomePage';
import QuickUpload from '../components/quickUpload';
import TaxonomiesEditor from '../components/taxonomiesEditor';
import TemplatesEditor from '../components/templatesEditor';
import EntriesEditor from '../components/entriesEditor';

const Home: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { publicKey, connected } = useWallet();
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);
  const currentProcess = useAppSelector(
    (state: any) => state.process.currentProcess
  );

  useEffect(() => {
    dispatch(setCurrentProcess(currentProcess));
  });

  return (
    <>
      <Head>
        <title>Playa - WebApp</title>
      </Head>

      {!connected && <StaticHomePage />}

      {connected && currentProcess === 'default' && (
        <>
          <Subnav />
          {activeTab === 'Templates' && <TemplatesList />}
          {activeTab === 'Entries' && <EntriesList />}
          {activeTab === 'Taxonomies' && <TaxonomiesList />}
        </>
      )}
      {connected && currentProcess === 'quickUpload' && <QuickUpload />}
      {connected && currentProcess === 'taxonomiesEditor' && (
        <TaxonomiesEditor />
      )}
      {connected && currentProcess === 'templatesEditor' && <TemplatesEditor />}
      {connected && currentProcess === 'entriesEditor' && <EntriesEditor />}
      {/* {connected && currentProcess === 'templatesListSelectModal' && (
        <TemplatesSelectModal />
      )} */}
    </>
  );
};

// Use SSG here to get the data at build time
export default Home;
