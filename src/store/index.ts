import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';

import commonSlice from './commonSlice';

const rootReducer = combineReducers({
  [commonSlice.name]: commonSlice.reducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
