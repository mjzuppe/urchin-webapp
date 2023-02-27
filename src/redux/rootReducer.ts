import { combineReducers } from 'redux';

import subNav from './slices/subNav';
import process from './slices/process';

const rootReducer = combineReducers({
  subNav: subNav,
  process: process,
});

export { rootReducer };
