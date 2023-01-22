import axios from 'axios';

import store from 'store';
import { setAccessToken } from 'store/authSlice';
import * as common from './common';
import * as auth from './auth';
import * as users from './users';
import * as cafes from './cafes';
import * as genre from './genre';
import * as themes from './themes';
import * as sitemaps from './sitemaps';

export const staticApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STATIC_URL,
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

api.interceptors.request.use((config: any) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(undefined, error => {
  const { config, response } = error;

  if (response.status !== 401) {
    return Promise.reject(error);
  }

  if (config.url === '/auth/refresh') {
    return Promise.reject(error);
  }

  return auth
    .refreshToken()
    .then(({ data }) => {
      const { accessToken } = data;
      store.dispatch(setAccessToken(accessToken));
      return new Promise((resolve, reject) => {
        api
          .request(config)
          .then(result => resolve(result))
          .catch(error => reject(error));
      });
    })
    .catch(error => Promise.reject(error));
});

export default {
  common,
  auth,
  users,
  cafes,
  genre,
  themes,
  sitemaps,
};
