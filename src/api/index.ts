import axios from 'axios';

import { store } from 'store';
import { currentAuthenticatedUser } from 'store/authSlice';

import { refreshToken } from './auth';

import * as common from './common';
import * as auth from './auth';
import * as users from './users';
import * as cafes from './cafes';
import * as cafeReviews from './cafeReviews';
import * as genre from './genre';
import * as themes from './themes';
import * as themeReviews from './themeReviews';
import * as sitemaps from './sitemaps';
import * as faq from './faq';
import * as images from './images';

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

api.interceptors.response.use(undefined, async error => {
  const { config, response } = error;

  if (
    response?.status === 401 &&
    config.url !== '/auth/refresh' &&
    !config?._retry
  ) {
    // Request new access token using refresh token
    try {
      const { data } = await refreshToken();

      // Use callback to set access token and user
      store.dispatch(currentAuthenticatedUser(data));
    } catch {
      store.dispatch(currentAuthenticatedUser(null));
    }

    // Update failed request's header and retry it
    config._retry = true;

    return api(config);
  }

  return Promise.reject(error);
});

export default {
  common,
  auth,
  users,
  cafes,
  cafeReviews,
  genre,
  themes,
  themeReviews,
  sitemaps,
  faq,
  images,
};
