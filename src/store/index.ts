import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { createWrapper } from 'next-redux-wrapper';

import commonSlice from './commonSlice';
import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  [commonSlice.name]: commonSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const makeStore = () => {
  const storage =
    typeof window !== 'undefined'
      ? createWebStorage('local')
      : createNoopStorage();

  const persistConfig = {
    key: 'root',
    version: 1.0,
    storage,
    whiteList: ['recentlySearch'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const persistedStore: any = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
  });
  persistedStore.__persistor = persistStore(persistedStore);

  return persistedStore;
};
export const wrapper = createWrapper(makeStore);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
