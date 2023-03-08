import { NextPage } from 'next';
import { useEffect } from 'react';
import Script from 'next/script';

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
import SEO from '../components/shared/seo';

const Home: NextPage = ({ metas }: any): JSX.Element => {
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
      <SEO
        url={metas?.url}
        title={metas?.title}
        description={metas?.description}
        imgUrl={metas?.imgUrl}
        keywords={metas?.keywords}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4K3HB47RXE`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4K3HB47RXE');
          `,
        }}
      />

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
    </>
  );
};

// Use SSG here to get the data at build time
export default Home;

export async function getStaticProps() {
  const metas = {
    url: 'https://www.urchin.so',
    title: 'Urchin | Headless CMS for web3',
    description:
      'The first content management system designed for blockchain dApps, Urchin is an open-source SDK and protocol which is scaleable and flexible. Manage content and media with a structured taxonomy system to instantly start building your content layer for decentralized applications.',
    imgUrl: 'https://www.urchin.so/assets/bg.png',
    keywords: 'headless cms, blockchain, Solana, bundlr, arweave, open-source',
  };
  return {
    props: metas,
  };
}
