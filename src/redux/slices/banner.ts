import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublicKey } from '@solana/web3.js';

interface displayBannerState {
  displayBanner: boolean;
  walletConnected: boolean;
  walletPublicKey: PublicKey | null;
}

// Define the initial state using that type
const initialState: displayBannerState = {
  displayBanner: false,
  walletConnected: false,
  walletPublicKey: null
};

const slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setDisplayBanner(state, { payload }: PayloadAction<any>) {
      state.displayBanner = payload;
    },
    setWalletConnected(state, { payload }: PayloadAction<any>) {
      state.walletConnected = payload;
    },
    setWalletPublicKey(state, { payload }: PayloadAction<any>) {
      state.walletPublicKey = payload;
    },
  },
});

export const { setDisplayBanner, setWalletConnected, setWalletPublicKey } = slice.actions;

// Reducer
export default slice.reducer;
