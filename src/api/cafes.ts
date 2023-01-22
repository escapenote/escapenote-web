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
  sort?: string;
  order?: string;
}
export const fetchCafes = async ({
  term,
  areaB,
  take = 20,
  cursor,
  sort,
  order,
}: IFetchCafesProps) => {
  const params = { take, cursor } as IFetchCafesProps;
  if (term) params.term = term;
  if (areaB) params.areaB = areaB;
  if (sort) params.sort = sort;
  if (order) params.order = order;

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

/**
 * 카페 저장
 */
interface ISaveCafeProps {
  id: string;
}
export const saveCafe = async ({ id }: ISaveCafeProps) => {
  const { data } = await api.post(`cafes/${id}/save`);
  return data;
};

/**
 * 카페 저장 취소
 */
interface IUnSaveCafeProps {
  id: string;
}
export const unSaveCafe = async ({ id }: IUnSaveCafeProps) => {
  const { data } = await api.post(`cafes/${id}/unsave`);
  return data;
};
