import dynamic from 'next/dynamic';

// Styles
import Image from 'next/image';
import classes from './StaticHomePage.module.scss';

// images
import bg from '../../../public/assets/bg.png';
import meshBg from '../../../public/assets/mesh.png';
import arweave from '../../../public/assets/arweave-logo-full.svg';
import solana from '../../../public/assets/solana-logo-full.svg';
import bundlr from '../../../public/assets/bundlr-logo-full.svg';
import entries from '../../../public/assets/entries_img.png';
import file from '../../../public/assets/file_upload_img.png';
import importImg from '../../../public/assets/import_img.png';
import dataIcon from '../../../public/assets/data-icon.svg';
import fileIcon from '../../../public/assets/media-file-icon.svg';
import taxonomyIcon from '../../../public/assets/taxonomy-icon.svg';
import linkIcon from '../../../public/assets/link-icon-mini.svg';
import imgStack from '../../../public/assets/img_stack.png';

// Utils
import useWindowSize from '../../utils/useWindowSize';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

// Components
import Separator from '../shared/separator';

const StaticHomePage = () => {
  const { connected } = useWallet();
  const { width } = useWindowSize();
  const isMobile = width! < 1024;

  return (
    <>
      <div className={classes.background_wrapper}>
        <Image
          alt="Shapes"
          src={bg}
          placeholder="blur"
          quality={100}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <section className={classes.homepage_section}>
        <div className={classes.container}>
          <h1>Headless CMS</h1>
          <h2>for Web3</h2>
          <h3>Content and media management layer for dApp developers</h3>
          <WalletMultiButtonDynamic
            className={`${classes.btn_wallet_connect} ${classes.btn_top}`}
          >
            {!connected ? 'Connect Wallet' : null}
          </WalletMultiButtonDynamic>
        </div>

        <div className={classes.flex_container}>
          <p>Built On:</p>
          <div className={classes.img_wrapper}>
            <Image
              src={arweave}
              alt="Arweave logo"
              width={200}
              height={45}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <Image
              src={solana}
              alt="Solana logo"
              width={195}
              height={30}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <Image
              src={bundlr}
              alt="Bundlr logo"
              width={140}
              height={50}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        <div className={classes.mesh_shape_wrapper}>
          <div className={classes.mesh_background_wrapper}>
            <Image
              alt="Shape"
              src={meshBg}
              placeholder="blur"
              quality={100}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className={classes.value_proposition_container}>
            <div className={classes.flex_wrapper_left}>
              <h3>Start Building With Urchin Content Studio</h3>
              <p>Start building with Urchin without any code.</p>
              <WalletMultiButtonDynamic className={classes.btn_wallet_connect}>
                {!connected ? 'Connect Wallet' : null}
              </WalletMultiButtonDynamic>
            </div>
            <div className={classes.flex_wrapper_right}>
              <Image
                src={imgStack}
                alt="App preview"
                width={650}
                height={535}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
          {/* reinsurance items */}
          <div className={classes.reinsurance_container} id="reinsurance">
            <div className={classes.reinsurance_item}>
              <Image
                src={dataIcon}
                alt="Data gouvernance icon"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <h4>Data Gouvernance</h4>
              <p>
                Use templates to format and validate your content and media
                entries.
              </p>
            </div>
            <div className={classes.reinsurance_item}>
              <Image
                src={fileIcon}
                alt="Media & Data icon"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <h4>Media & Data</h4>
              <p>
                Flexible and agnostic design integrates files such as media
                alongside your data.
              </p>
            </div>
            <div className={classes.reinsurance_item}>
              <Image
                src={taxonomyIcon}
                alt="Taxonomy icon"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <h4>Taxonomy</h4>
              <p>
                Scalable tagging system designed with depth for robust content
                organization.
              </p>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className={classes.footer}>
          <Separator />
          <div className={classes.footer_container}>
            <Link href="/">
              <Image
                src="/assets/urchin-logo.svg"
                width={isMobile ? 70 : 100}
                height={isMobile ? 20 : 25}
                alt="Urchin logo"
                className={classes.logo}
              />
            </Link>
            <span className="filler"></span>
            {/* <Link href="/" className={classes.footer_link} id={classes.github}>
            <p>Github</p>
            <Image
              src={linkIcon}
              width={12}
              height={12}
              alt="link icon - redirect to github"
            />
          </Link>
          <Link href="/" className={classes.footer_link}>
            <p>Contact</p>
          </Link> */}
          </div>
        </footer>
      </section>
    </>
  );
};
export default StaticHomePage;
