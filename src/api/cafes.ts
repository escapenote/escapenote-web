import { api } from 'api';
import { IPage, ICafe, ICafeReview, IBlogReview } from 'types';

/**
 * 추천 카페 리스트 조회
 */
export const fetchRecommendCafes = async () => {
  const { data } = await api.get<ICafe[]>('/recommend-cafes');
  return data;
};

/**
 * 카페 리스트 조회
 */
interface IFetchCafesProps {
  term?: string;
  areaA?: string;
  areaB?: string;
  take?: number;
  cursor?: string;
  sort?: string;
  order?: string;
}
export const fetchCafes = async ({
  term,
  areaA,
  areaB,
  take = 20,
  cursor,
  sort,
  order,
}: IFetchCafesProps) => {
  const params = { take, cursor } as IFetchCafesProps;
  if (term) params.term = term;
  if (areaA) params.areaA = areaA;
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

/**
 * 카페 리뷰 리스트 조회
 */
interface IFetchCafeReviewProps {
  id: string;
  take?: number;
  cursor?: string;
  sort?: string;
  order?: string;
}
export const fetchCafeReviews = async ({
  id,
  take = 20,
  cursor,
  sort,
  order,
}: IFetchCafeReviewProps) => {
  const params = { take } as IFetchCafesProps;
  if (cursor) params.cursor = cursor;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await api.get<{ items: ICafeReview[]; pageInfo: IPage }>(
    `cafes/${id}/reviews`,
    {
      params,
    },
  );
  return data;
};

/**
 * 카페 리뷰 작성
 */
export interface IWriteReviewOnCafeProps {
  id: string;
  rating: number;
  text: string;
}
export const writeReviewOnCafe = async ({
  id,
  rating,
  text,
}: IWriteReviewOnCafeProps) => {
  const body = { rating, text };
  const { data } = await api.post<boolean>(`cafes/${id}/reviews`, body);
  return data;
};

/**
 * 카페 블로그 리뷰 리스트 조회
 */
interface IFetchCafeBlogReviewsProps {
  id: string;
  take?: number;
  cursor?: string;
}
export const fetchCafeBlogReviews = async ({
  id,
  take = 20,
  cursor,
}: IFetchCafeBlogReviewsProps) => {
  const params = { take } as IFetchCafeBlogReviewsProps;
  if (cursor) params.cursor = cursor;

  const { data } = await api.get<{ items: IBlogReview[]; pageInfo: IPage }>(
    `cafes/${id}/blog-reviews`,
    {
      params,
    },
  );
  return data;
};
