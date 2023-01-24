import { api } from 'api';
import { IFaq } from 'types';

/**
 * FAQ 리스트 조회
 */
interface IFetchFaqListProps {
  term?: string;
}
export const fetchFaqList = async ({ term }: IFetchFaqListProps) => {
  const params = {} as any;
  if (term) params.term = term;
  const { data } = await api.get<IFaq[]>('faq', { params });
  return data;
};
