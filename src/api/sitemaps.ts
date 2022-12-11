import { api } from 'api';

/**
 * 카페 리스트 조회
 */
interface IFetchCafesRes {
  id: string;
  updatedAt: string;
}
export const fetchCafes = async () => {
  const { data } = await api.get<IFetchCafesRes[]>('/sitemaps/cafes');
  return data;
};

/**
 * 테마 리스트 조회
 */
interface IFetchThemesRes {
  id: string;
  updatedAt: string;
}
export const fetchThemes = async () => {
  const { data } = await api.get<IFetchThemesRes[]>('/sitemaps/themes');
  return data;
};
