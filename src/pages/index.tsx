import { NextPage } from 'next';
import { useEffect } from 'react';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';

// redux
import { setDisplayBanner } from '../redux/slices/banner';
import { setCurrentProcess } from '../redux/slices/process';

// Utils
import { useAppSelector } from '../utils/useAppSelector';
import { useAppDispatch } from '../utils/useAppDispatch';
import useWindowSize from '../utils/useWindowSize';

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
import PublishBanner from '../components/shared/publishBanner';

const Home: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const isMobile = width! < 1024;
  const { connected } = useWallet();
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);
  const currentProcess = useAppSelector(
    (state: any) => state.process.currentProcess
  );

  const templates = useAppSelector((state: any) => state.templates);
  const entries = useAppSelector((state: any) => state.entries);
  const taxonomies = useAppSelector((state: any) => state.taxonomies);
  const assets = useAppSelector((state: any) => state.assets);

  useEffect(() => {
    dispatch(setCurrentProcess(currentProcess));
  });

  const displayBanner = useAppSelector(
    (state: any) => state.banner.displayBanner
  );

  useEffect(() => {
    if (connected) {
      if (
        templates.isPublishable ||
        entries.isPublishable ||
        taxonomies.isPublishable ||
        assets.isPublishable
      ) {
        dispatch(setDisplayBanner(true));
      } else {
        dispatch(setDisplayBanner(false));
      }
    }
  }, [
    displayBanner,
    connected,
    templates,
    entries,
    taxonomies,
    dispatch,
    assets,
  ]);

  return (
    <div
      className="container"
      style={{
        paddingBottom:
          // connected && displayBanner ? '90px' : isMobile ? '135px' : '0',
          connected && displayBanner && !isMobile
            ? '110px'
            : isMobile && connected
            ? '135px'
            : '0',
      }}
    >
      {!connected && <StaticHomePage />}
      {connected && currentProcess === 'default' && (
        <>
          <Subnav />
          {activeTab === 'Templates' && <TemplatesList />}
          {activeTab === 'Entries' && <EntriesList />}
          {activeTab === 'Taxonomies' && <TaxonomiesList />}
        </>
      )}
      {/* {connected && currentProcess === 'quickUpload' && <QuickUpload />} */}
      {connected && currentProcess === 'taxonomiesEditor' && (
        <TaxonomiesEditor />
      )}
      {connected && currentProcess === 'templatesEditor' && <TemplatesEditor />}
      {connected && currentProcess === 'entriesEditor' && <EntriesEditor />}

      {displayBanner && <PublishBanner />}
    </div>
  );
};

export default Home;
