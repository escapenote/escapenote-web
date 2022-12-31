import { api } from 'api';
import { IPage, ICafe } from 'types';

/**
 * 카페 리스트 조회
 */
interface IFetchCafesProps {
  term?: string;
  areaB?: string;
  take?: number;
  cursor?: string;
}
export const fetchCafes = async ({
  term,
  areaB,
  take = 20,
  cursor,
}: IFetchCafesProps) => {
  const params = { take, cursor } as IFetchCafesProps;
  if (term) params.term = term;
  if (areaB) params.areaB = areaB;

  const { data } = await api.get<{ items: ICafe[]; pageInfo: IPage }>('cafes', {
    params,
  });
  return data;
};

/**
 * 카페 상세 조회
 */
interface IFetchCafeProps {
  id: string;
}
export const fetchCafe = async ({ id }: IFetchCafeProps) => {
  const { data } = await api.get<ICafe>(`cafes/${id}`);
  return data;
};
