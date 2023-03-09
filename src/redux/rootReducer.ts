import { combineReducers } from 'redux';

import subNav from './slices/subNav';
import process from './slices/process';
import taxonomies from './slices/taxonomies';
import templates from './slices/templates';
import entries from './slices/entries';
import banner from './slices/banner';

const rootReducer = combineReducers({
  subNav: subNav,
  process: process,
  taxonomies: taxonomies,
  templates: templates,
  entries: entries,
  banner: banner,
});

export { rootReducer };
