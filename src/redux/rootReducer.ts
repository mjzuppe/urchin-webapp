import { combineReducers } from 'redux';

import subNav from './slices/subNav';

const rootReducer = combineReducers({
  subNav: subNav,
});

export { rootReducer };
