import { api } from 'api';
import { IPage, IGenre } from 'types';

/**
 * 장르 리스트 조회
 */
export const fetchGenreList = async () => {
  const { data } = await api.get<IGenre[]>('genre');
  return data;
};
