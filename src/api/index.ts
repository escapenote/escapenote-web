import axios from 'axios';

import * as common from './common';
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

export default {
  common,
  cafes,
  genre,
  themes,
  sitemaps,
};
