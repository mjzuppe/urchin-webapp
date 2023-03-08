import Head from 'next/head';

interface SEOProps {
  url?: string;
  title?: string;
  description?: string;
  imgUrl?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  url,
  title,
  description,
  imgUrl,
  keywords,
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>

      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* <meta
        name="facebook-domain-verification"
        content="3exd0btakei3zfau2q4d6po71p3u12"
      /> */}

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgUrl} />
    </Head>
  );
};

SEO.defaultProps = {
  url: 'https://www.urchin.so',
  title: 'Urchin | Headless CMS for web3',
  description:
    'The first content management system designed for blockchain dApps, Urchin is an open-source SDK and protocol which is scaleable and flexible. Manage content and media with a structured taxonomy system to instantly start building your content layer for decentralized applications.',
  imgUrl: 'https://www.urchin.so/assets/bg.png',
  keywords: 'headless cms, blockchain, Solana, bundlr, arweave, open-source',
};

export default SEO;
