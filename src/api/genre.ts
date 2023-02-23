import { api } from 'api';
import { IGenre } from 'types';

/**
 * 장르 리스트 조회
 */
interface IFetchGenreListProps {
  term?: string;
}
export const fetchGenreList = async ({ term }: IFetchGenreListProps) => {
  const params = {} as IFetchGenreListProps;
  if (term) params.term = term;

  const { data } = await api.get<IGenre[]>('genre', { params });
  return data;
};
