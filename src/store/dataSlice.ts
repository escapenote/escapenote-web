import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import api from 'api';
import { RootState } from 'store';

export type DataState = {
  location: { [key: string]: string[] };
};

const initialState: DataState = {
  location: {},
};

export const hydrate = createAction<RootState>(HYDRATE);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = dataSlice.actions;

export const fetchCommonData = () => async (dispatch: Dispatch) => {
  const { data } = await api.common.fetchCommon();
  dispatch(setLocation(data.location));
};

export default dataSlice;
