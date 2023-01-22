import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from 'store';

export interface IState {
  term: string;
  values: string[];
}

const initialState: IState = {
  term: '',
  values: [],
};

export const hydrate = createAction<AppState>(HYDRATE);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    addRecentlySearchKeyword: (state, action: PayloadAction<string>) => {
      const filteredValue = state.values.filter(id => id !== action.payload);
      state.values = [action.payload, ...filteredValue];
      state.values.splice(8);
    },
  },
});

export const { setTerm, addRecentlySearchKeyword } = searchSlice.actions;

export default searchSlice;
