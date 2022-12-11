import axios from 'axios';

import * as cafes from './cafes';
import * as themes from './themes';
import * as sitemaps from './sitemaps';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

export default {
  cafes,
  themes,
  sitemaps,
};
