import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState, revertAll } from 'store';

export type SearchState = {
  term: string;
  values: string[];
};

const initialState: SearchState = {
  term: '',
  values: [],
};

export const hydrate = createAction<RootState>(HYDRATE);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
    setTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    addRecentlySearchKeyword: (state, action: PayloadAction<string>) => {
      const filteredValue = state.values.filter(id => id !== action.payload);
      state.values = [action.payload, ...filteredValue];
      state.values.splice(8);
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { setTerm, addRecentlySearchKeyword } = searchSlice.actions;

export default searchSlice;
