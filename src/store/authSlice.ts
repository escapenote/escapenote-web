import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import api from 'api';
import { IUser } from 'types';
import { AppState, revertAll } from 'store';

type SliceState = {
  accessToken: string;
  user: IUser | null;
};

const initialState: SliceState = {
  accessToken: '',
  user: null,
};

export const hydrate = createAction<AppState>(HYDRATE);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    currentAuthenticatedUser: (
      state,
      action: PayloadAction<{ accessToken: string; user: IUser } | null>,
    ) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      } else {
        state.accessToken = '';
        state.user = null;
      }
    },
    editProfile: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    login: (
      state,
      action: PayloadAction<{ accessToken: string; user: IUser }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: state => {
      state.accessToken = '';
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(revertAll, () => initialState);
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const {
  setAccessToken,
  currentAuthenticatedUser,
  editProfile,
  login,
  logout,
} = authSlice.actions;

export const currentAuthenticatedUserAsync =
  (cookies: string = '') =>
  (dispatch: Dispatch) => {
    return api.auth
      .refreshToken(cookies)
      .then(({ data }) => {
        dispatch(currentAuthenticatedUser(data));
        return data;
      })
      .catch(() => {
        dispatch(currentAuthenticatedUser(null));
      });
  };

export default authSlice;
