import { NextPage } from 'next';
import { useEffect } from 'react';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDisplayBanner } from '../redux/slices/banner';
import { setCurrentProcess } from '../redux/slices/process';
import { setTemplates } from '../redux/slices/templates';

// Utils
import { useAppDispatch } from '../utils/useAppDispatch';
import { useAppSelector } from '../utils/useAppSelector';
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
import connection from '../utils/connection';
import { setTaxonomies } from '../redux/slices/taxonomies';

const Home: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const isMobile = width! < 1024;
  const { connected } = useWallet();
  const activeTab = useAppSelector((state: any) => state.subNav.activeTab);
  const currentProcess = useAppSelector(
    (state: any) => state.process.currentProcess
  );

  const templates = useSelector((state: RootState) => state.templates);
  const entries = useAppSelector((state: RootState) => state.entries);
  const taxonomies = useAppSelector((state: RootState) => state.taxonomies);
  const assets = useAppSelector((state: any) => state.assets);

  useEffect(() => {
    dispatch(setCurrentProcess(currentProcess));
  });

  const displayBanner = useAppSelector(
    (state: any) => state.banner.displayBanner
  );

  useEffect(() => {
    // Get taxonomies from chain
    connection.taxonomy.getAll().then((res) => {
      const pubKeyArray = res.map((taxonomy: any) => {
        return taxonomy.publicKey;
      });
      connection.taxonomy.get(pubKeyArray).then((res) => {
        return dispatch(setTaxonomies(res));
      });
    });

    // Get templates from chain
    connection.template.getAll().then((res) => {
      const templatePubKeyArray = res.map((template: any) => {
        return template.publicKey;
      });
      connection.template.get(templatePubKeyArray).then((res) => {
        console.log(res);
        return dispatch(setTemplates(res));
      });
    });
  }, []);

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
        // TODO: fix : state is not updated isPublishable is true
        dispatch(setDisplayBanner(false));
      }
    }
  }, [connected, templates, entries, dispatch, assets, taxonomies]);

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

      {connected && displayBanner && <PublishBanner />}
    </div>
  );
};

export default Home;
