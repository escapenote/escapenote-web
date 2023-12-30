import type { AnyAction, CombinedState, Reducer } from '@reduxjs/toolkit';
import {
  createAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import commonSlice, { type CommonState } from './commonSlice';
import dataSlice, { type DataState } from './dataSlice';
import authSlice, { type AuthState } from './authSlice';
import signupSlice, { type SignupState } from './signupSlice';
import passwordSlice, { type PasswordState } from './passwordSlice';
import searchSlice, { type SearchState } from './searchSlice';
import imageSlice, { type ImageState } from './imageSlice';
import reviewSlice, { type ReviewState } from './reviewSlice';

export const revertAll = createAction('REVERT_ALL');

type State = {
  [commonSlice.name]: CommonState;
  [dataSlice.name]: DataState;
  [authSlice.name]: AuthState;
  [signupSlice.name]: SignupState;
  [passwordSlice.name]: PasswordState;
  [searchSlice.name]: SearchState;
  [imageSlice.name]: ImageState;
  [reviewSlice.name]: ReviewState;
};

const rootReducer = (state: State, action: AnyAction): CombinedState<State> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        [commonSlice.name]: commonSlice.reducer,
        [dataSlice.name]: dataSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [signupSlice.name]: signupSlice.reducer,
        [passwordSlice.name]: passwordSlice.reducer,
        [searchSlice.name]: searchSlice.reducer,
        [imageSlice.name]: imageSlice.reducer,
        [reviewSlice.name]: reviewSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

const makeStore = () => {
  const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReducer as Reducer<State, AnyAction>,
  });
  return store;
};

export const store = makeStore();

export const wrapper = createWrapper(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
