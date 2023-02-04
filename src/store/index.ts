import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  configureStore,
  combineReducers,
  createAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import commonSlice from './commonSlice';
import dataSlice from './dataSlice';
import authSlice from './authSlice';
import signupSlice from './signupSlice';
import passwordSlice from './passwordSlice';
import searchSlice from './searchSlice';
import imageSlice from './imageSlice';
import reviewSlice from './reviewSlice';

export const revertAll = createAction('REVERT_ALL');

const rootReducer = combineReducers({
  [commonSlice.name]: commonSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [signupSlice.name]: signupSlice.reducer,
  [passwordSlice.name]: passwordSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [imageSlice.name]: imageSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
