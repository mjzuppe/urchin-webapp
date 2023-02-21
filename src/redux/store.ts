import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
