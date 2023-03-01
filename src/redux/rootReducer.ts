import { combineReducers } from 'redux';

import subNav from './slices/subNav';
import process from './slices/process';
import taxonomies from './slices/taxonomies';
import templates from './slices/templates';

const rootReducer = combineReducers({
  subNav: subNav,
  process: process,
  taxonomies: taxonomies,
  templates: templates,
});

export { rootReducer };
