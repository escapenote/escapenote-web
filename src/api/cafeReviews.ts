import { api } from 'api';
import { ICafeReview, IPage } from 'types';

/**
 * 카페 리뷰 리스트 조회
 */
interface IFetchCafeReviewsProps {
  nickname: string;
  take?: number;
  cursor?: string;
}
export const fetchReviews = async ({
  nickname,
  take,
  cursor,
}: IFetchCafeReviewsProps) => {
  const params = { nickname } as IFetchCafeReviewsProps;
  if (take) params.take = take;
  if (cursor) params.cursor = cursor;

  const { data } = await api.get<{ items: ICafeReview[]; pageInfo: IPage }>(
    '/cafe-reviews',
    {
      params,
    },
  );
  return data;
};

/**
 * 카페 리뷰 조회
 */
interface IFetchCafeReviewProps {
  id: string;
}
export const fetchReview = async ({ id }: IFetchCafeReviewProps) => {
  const { data } = await api.get<ICafeReview>(`/cafe-reviews/${id}`);
  return data;
};

/**
 * 카페 리뷰 수정
 */
export interface IUpdateCafeReviewProps {
  id: string;
  cafeId: string;
  rating: number;
  text: string;
}
export const updateReview = async ({
  id,
  cafeId,
  rating,
  text,
}: IUpdateCafeReviewProps) => {
  const params = { cafeId };
  const body = { rating, text };
  const { data } = await api.patch<boolean>(`/cafe-reviews/${id}`, body, {
    params,
  });
  return data;
};

/**
 * 카페 리뷰 삭제
 */
export interface IDeleteCafeReviewProps {
  id: string;
  cafeId: string;
}
export const deleteReview = async ({ id, cafeId }: IDeleteCafeReviewProps) => {
  const params = { cafeId };
  const { data } = await api.delete(`/cafe-reviews/${id}`, { params });
  return data;
};
