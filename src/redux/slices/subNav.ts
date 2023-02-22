import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface SubNavState {
  activeTab: string;
}

// Define the initial state using that type
const initialState: SubNavState = {
  activeTab: 'Templates',
};

const slice = createSlice({
  name: 'subNav',
  initialState,
  reducers: {
    setActiveTab(state, { payload }: PayloadAction<any>) {
      state.activeTab = payload;
    },
  },
});

export const { setActiveTab } = slice.actions;

// Reducer
export default slice.reducer;
