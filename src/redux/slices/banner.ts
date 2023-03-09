import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface displayBannerState {
  displayBanner: boolean;
}

// Define the initial state using that type
const initialState: displayBannerState = {
  displayBanner: false,
};

const slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setDisplayBanner(state, { payload }: PayloadAction<any>) {
      state.displayBanner = payload;
    },
  },
});

export const { setDisplayBanner } = slice.actions;

// Reducer
export default slice.reducer;
