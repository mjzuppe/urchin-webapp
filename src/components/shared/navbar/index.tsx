import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useRef, useCallback } from 'react';

//styles
import classes from './Navbar.module.scss';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
// Utils
import useOnClickOutside from '../../../utils/useOnClickOutside';
import useWindowSize from '../../../utils/useWindowSize';

// Components
const Navbar = (): JSX.Element => {
  const { publicKey, connected, disconnect } = useWallet();
  const [openWalletDropdown, setOpenWalletDropdown] = useState(false);

  const walletKey = publicKey?.toBase58();
  const walletKeyTruncated = `${walletKey?.slice(0, 4)}...${walletKey?.slice(
    walletKey?.length - 4,
    walletKey?.length
  )}`;

  const { width } = useWindowSize();
  const isMobile = width! < 1024;

  const walletMenuRef = useRef(null);
  useOnClickOutside(
    walletMenuRef,
    useCallback(() => {
      setOpenWalletDropdown(false);
    }, [])
  );

  const walletDropdownHandler = () => {
    setOpenWalletDropdown(!openWalletDropdown);
  };

  // disconnect wallet
  const handleDisconnectWalletClick = () => {
    disconnect();
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.flex_left}>
        <Link href="/" className={classes.navbar_links}>
          <Image
            src="/assets/urchin-logo.svg"
            width={isMobile ? 70 : 100}
            height={isMobile ? 20 : 25}
            alt="Urchin logo"
            className={classes.logo}
          />
        </Link>
        {!connected && !isMobile && (
          // TODO: Anchor id to be provided
          <Link
            href="/#reinsurance"
            scroll={false}
            className={classes.navbar_links}
          >
            <p>Features</p>
          </Link>
        )}
      </div>

      {/* TODO: Links TBC */}
      {/* <div className={`${classes.link_container} ${classes.flex_right}`}> */}
      {/* {!isMobile && (
          <Link href="/" className={classes.navbar_links}>
            <p>Getting Started</p>
          </Link>
        )}
        <Link href="/" className={classes.navbar_links}>
          <p>Docs</p>
        </Link> */}

      {/* Wallet */}
      {/* <div
          className={classes.wallet_wrapper}
          onClick={walletDropdownHandler}
          ref={walletMenuRef}
        > */}
      {/* Phantom not connected */}
      {/* {!connected && <p>Connect Wallet</p>} */}
      {/* Phantom connected*/}
      {/* {connected && (
            <>
              {/* Green Dot icon */}
      {/* <Image
                src="/assets/green-dot.svg"
                width={5}
                height={5}
                alt="connected wallet icon - Green dot"
              />
              <p
                className={classes.wallet_key_connected}
                id="wallet_key_connected"
              >
                {walletKeyTruncated}
              </p>
              <Image
                src="/assets/chevron-up.svg"
                width={6}
                height={3}
                alt="chevron up icon - Wallet is connected"
              />
            </>
          )}  */}

      {/* DROPDOWN Wallet */}
      {/* {openWalletDropdown && ( */}
      {/* <div className={classes.wallet_dropdown}>
              <span className={classes.triangle}></span>
              <div className={classes.wallet_dropdown_container}>
                <div className={classes.wallet_dropdown_inner_top_wrapper}>
                  {connected && (
                    <div className={classes.wallet_dropdown_inner_top}>
                      <Image
                        src="/assets/green-dot.svg"
                        width="5"
                        height="5"
                        alt="green dot"
                      />
                      <span className={classes.textGrey}>Connected</span>
                    </div> */}
      {/* )} */}
      {/* {!connected && ( */}
      {/* <div className={classes.wallet_dropdown_inner_top}>
                      <Image
                        src="/assets/red-plug.svg"
                        width="14"
                        height="14"
                        alt="Disconnected wallet icon - Barred red plug"
                      />
                      <span className={classes.textGrey}>Disconnected</span> */}
      {/* </div> */}
      {/* )} */}
      {/* {connected && ( */}
      {/* <p
                      className={classes.disconnect}
                      onClick={handleDisconnectWalletClick}
                    >
                      Disconnect wallet
                    </p> */}
      {/* )} */}
      {/* </div> */}
      {/* <div className={classes.wallet_adapter_container}>
                  <WalletMultiButtonDynamic
                    className={`${classes.btn_wallet_connect} ${
                      connected ? classes.connected : classes.disconnected
                    }`}
                  >
                    {!connected ? 'Connect Wallet' : null}
                  </WalletMultiButtonDynamic>
                </div> */}
      {/* </div>
            </div>
          )}
        </div> */}

      {/* End wallet */}
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
