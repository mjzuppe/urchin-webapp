import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Files } from '../../types/Files';

interface AssetsState {
  assets: Array<Files>;
  isPublishable: boolean;
}

const initialState: AssetsState = {
  assets: [],
  isPublishable: false,
};

const slice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setIsPublishable: (state, { payload }: PayloadAction<any>) => {
      state.isPublishable = payload;
    },
    // addNewAsset: (state, action: PayloadAction<any>) => {
    //   state.assets.push(action.payload);
    // },
  },
});

export const { setIsPublishable } = slice.actions;

// Reducer
export default slice.reducer;
