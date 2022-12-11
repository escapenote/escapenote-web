import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from 'store';

type ThemeType = 'dark' | 'light';

export interface ICommonState {
  theme: ThemeType;
  isDesktop: string;
  isMobile: string;
}

const initialState: ICommonState = {
  theme: 'light',
  isDesktop: '',
  isMobile: '',
};

export const hydrate = createAction<AppState>(HYDRATE);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setIsDesktop: (state, action: PayloadAction<string>) => {
      state.isDesktop = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<string>) => {
      state.isMobile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.common,
      };
    });
  },
});

export const { setTheme, setIsDesktop, setIsMobile } = commonSlice.actions;

export default commonSlice;
