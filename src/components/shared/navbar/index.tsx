import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';

//styles
import classes from './Navbar.module.scss';

// Libs
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Utils
import useOnClickOutside from 'src/utils/useOnClickOutside';
import useWindowSize from '@/utils/useWindowSize';

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
  const isMobile = width < 1024;

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
        {/* {!isMobile && ( */}
        <Link
          href={connected ? '/dashboard' : '/'}
          className={classes.navbar_links}
        >
          <Image
            src="/assets/supermassiv-logo-white.svg"
            width={isMobile ? 100 : 200}
            height={isMobile ? 25 : 50}
            alt="Juice Box logo"
            className={classes.logo}
          />
        </Link>
        {/* )} */}
        {!connected && !isMobile && (
          // TODO: Anchor id to be provided
          <Link href="/" className={classes.navbar_links}>
            <p>Features</p>
          </Link>
        )}
      </div>

      {/* TODO: Links TBC */}
      <div className={`${classes.link_container} ${classes.flex_right}`}>
        {!isMobile && (
          <Link href="/" className={classes.navbar_links}>
            <p>Getting Started</p>
          </Link>
        )}
        <Link href="/" className={classes.navbar_links}>
          <p>Docs</p>
        </Link>

        {/* Wallet */}
        <div
          className={classes.wallet_wrapper}
          onClick={walletDropdownHandler}
          ref={walletMenuRef}
        >
          {/* Phantom not connected */}
          {!connected && <p>Connect Wallet</p>}
          {/* Phantom connected*/}
          {connected && (
            <>
              {/* Green Dot icon */}
              <Image
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
              {/* chevron up */}
              <svg
                width="6"
                height="3"
                viewBox="0 0 6 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.78586 0.0796349L0.0885715 2.52987C-0.0295238 2.63739 -0.0295238 2.81158 0.0885715 2.91936C0.206667 3.02688 0.398485 3.02688 0.516581 2.91936L2.99985 0.663477L5.48312 2.91909C5.60122 3.02661 5.79303 3.02661 5.91143 2.91909C6.02952 2.81158 6.02952 2.63711 5.91143 2.5296L3.21417 0.0793634C3.09729 -0.0264997 2.90246 -0.0264997 2.78586 0.0796349Z"
                  fill="#FFFFFF"
                />
              </svg>
            </>
          )}

          {/* DROPDOWN Wallet */}
          {openWalletDropdown && (
            <div className={classes.wallet_dropdown}>
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
                    </div>
                  )}
                  {!connected && (
                    <div className={classes.wallet_dropdown_inner_top}>
                      <Image
                        src="/assets/red-plug.svg"
                        width="14"
                        height="14"
                        alt="Disconnected wallet icon - Barred red plug"
                      />
                      <span className={classes.textGrey}>Disconnected</span>
                    </div>
                  )}
                  {connected && (
                    <p
                      className={classes.disconnect}
                      onClick={handleDisconnectWalletClick}
                    >
                      Disconnect wallet
                    </p>
                  )}
                </div>
                <div className={classes.wallet_adapter_container}>
                  <WalletMultiButton
                    className={`${classes.btn_wallet_connect} ${
                      connected ? classes.connected : classes.disconnected
                    }`}
                    // onClick={handleConnectWalletClick}
                  >
                    {!connected ? 'Connect Wallet' : null}
                  </WalletMultiButton>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* End wallet */}
      </div>
    </nav>
  );
};

export default Navbar;
