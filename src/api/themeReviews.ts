import { api } from 'api';
import { IThemeReview } from 'types';

/**
 * 테마 리뷰 조회
 */
interface IFetchThemeReviewProps {
  id: string;
}
export const fetchReview = async ({ id }: IFetchThemeReviewProps) => {
  const { data } = await api.get<IThemeReview>(`/theme-reviews/${id}`);
  return data;
};

/**
 * 테마 리뷰 수정
 */
export interface IUpdateThemeReviewProps {
  id: string;
  themeId: string;
  rating: number;
  success: boolean;
  level: number;
  fear: number;
  activity: number;
  text: string;
}
export const updateReview = async ({
  id,
  themeId,
  rating,
  success,
  level,
  fear,
  activity,
  text,
}: IUpdateThemeReviewProps) => {
  const params = { themeId };
  const body = { rating, success, level, fear, activity, text };
  const { data } = await api.patch<boolean>(`/theme-reviews/${id}`, body, {
    params,
  });
  return data;
};

/**
 * 테마 리뷰 삭제
 */
export interface IDeleteThemeReviewProps {
  id: string;
  themeId: string;
}
export const deleteReview = async ({
  id,
  themeId,
}: IDeleteThemeReviewProps) => {
  const params = { themeId };
  const { data } = await api.delete(`/theme-reviews/${id}`, { params });
  return data;
};
