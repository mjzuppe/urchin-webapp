import { combineReducers } from 'redux';

import subNav from './slices/subNav';
import process from './slices/process';
import taxonomies from './slices/taxonomies';
import templates from './slices/templates';
import entries from './slices/entries';
import banner from './slices/banner';
import assets from './slices/assets';

const rootReducer = combineReducers({
  subNav: subNav,
  process: process,
  taxonomies: taxonomies,
  templates: templates,
  entries: entries,
  banner: banner,
  assets: assets,
});

export { rootReducer };
