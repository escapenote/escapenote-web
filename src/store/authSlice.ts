import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IUser } from 'types';
import { RootState, revertAll } from 'store';
import { NextPageContext } from 'next';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export type AuthState = {
  accessToken: string;
  user: IUser | null;
};

const initialState: AuthState = {
  accessToken: '',
  user: null,
};

export const hydrate = createAction<RootState>(HYDRATE);

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
  ({ req, res }: NextPageContext<any>) =>
  (dispatch: Dispatch) => {
    const refreshToken = getCookie('refreshToken', { req, res });
    if (refreshToken) {
      const API = process.env.NEXT_PUBLIC_API?.replace('localhost', '0.0.0.0');
      return axios
        .post(`${API}/auth/refresh`, null, {
          headers: {
            Cookie: req?.headers.cookie,
          },
        })
        .then(({ data }) => {
          dispatch(currentAuthenticatedUser(data));
          setCookie('refreshToken', data.refreshToken, {
            req,
            res,
            domain: process.env.NEXT_PUBLIC_HOST,
            maxAge: data.expiredAt,
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
          });
        })
        .catch(() => {
          dispatch(currentAuthenticatedUser(null));
          deleteCookie('refreshToken', { req, res });
        });
    } else {
      dispatch(currentAuthenticatedUser(null));
    }
  };

export default authSlice;
