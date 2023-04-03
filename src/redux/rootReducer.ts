import { combineReducers } from 'redux';
import { resetState } from './actions';
import storage from 'redux-persist/lib/storage';
import { AnyAction } from '@reduxjs/toolkit';

import subNav from './slices/subNav';
import process from './slices/process';
import taxonomies from './slices/taxonomies';
import templates from './slices/templates';
import entries from './slices/entries';
import banner from './slices/banner';
import assets from './slices/assets';

const appReducer = combineReducers({
  subNav: subNav,
  process: process,
  taxonomies: taxonomies,
  templates: templates,
  entries: entries,
  banner: banner,
  assets: assets,
});

const rootReducer = (state: RootState, action: AnyAction) => {
  // Clear all data in redux store to initial.
  if (action.type === resetState) {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root');
    state = {} as RootState;
  }

  return appReducer(state, action);
};

export { rootReducer };
export type RootState = ReturnType<typeof appReducer>;
