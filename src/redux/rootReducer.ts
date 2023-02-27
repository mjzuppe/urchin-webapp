import { combineReducers } from 'redux';

import subNav from './slices/subNav';
import process from './slices/process';
import taxonomies from './slices/taxonomies';

const rootReducer = combineReducers({
  subNav: subNav,
  process: process,
  taxonomies: taxonomies,
});

export { rootReducer };
