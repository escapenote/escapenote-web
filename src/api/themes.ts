import { api } from 'api';
import { IBlogReview, IPage, ITheme, IThemeReview } from 'types';
import { getGrade, getLevel } from 'utils/translations';

/**
 * 추천 테마 리스트 조회
 */
export const fetchRecommendThemes = async () => {
  const { data } = await api.get<ITheme[]>('/recommend-themes');
  return data;
};

/**
 * 테마 리스트 조회
 */
interface IFetchThemesProps {
  term?: string;
  cafeId?: string;
  areaA?: string;
  areaB?: string;
  genre?: string;
  level?: string;
  person?: string;
  fearScore?: string;
  activity?: string;
  lockingRatio?: string;
  take?: number;
  cursor?: string;
  sort?: string;
  order?: string;
}
export const fetchThemes = async ({
  term,
  cafeId,
  areaA,
  areaB,
  genre,
  level,
  person,
  fearScore,
  activity,
  lockingRatio,
  take = 20,
  cursor,
  sort,
  order,
}: IFetchThemesProps) => {
  const params = { take, cursor } as any;
  if (term) params.term = term;
  if (cafeId) params.cafeId = cafeId;
  if (areaA) params.areaA = areaA;
  if (areaB) params.areaB = areaB;
  if (genre) params.genre = genre;
  if (level) params.level = getLevel(level);
  if (person) params.person = Number(person);
  if (fearScore) params.fearScore = getGrade(fearScore);
  if (activity) params.activity = getGrade(activity);
  if (lockingRatio) params.lockingRatio = getGrade(lockingRatio);
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await api.get<{ items: ITheme[]; pageInfo: IPage }>(
    'themes',
    { params },
  );
  return data;
};

/**
 * 테마 상세 조회
 */
interface IFetchThemeProps {
  id: string;
}
export const fetchTheme = async ({ id }: IFetchThemeProps) => {
  const { data } = await api.get<ITheme>(`themes/${id}`);
  return data;
};

/**
 * 테마 저장
 */
interface ISaveThemeProps {
  id: string;
}
export const saveTheme = async ({ id }: ISaveThemeProps) => {
  const { data } = await api.post(`themes/${id}/save`);
  return data;
};

/**
 * 테마 저장 취소
 */
interface IUnSaveThemeProps {
  id: string;
}
export const unSaveTheme = async ({ id }: IUnSaveThemeProps) => {
  const { data } = await api.post(`themes/${id}/unsave`);
  return data;
};

/**
 * 테마 리뷰 리스트 조회
 */
interface IFetchThemeReviewProps {
  id: string;
  take?: number;
  cursor?: string;
  sort?: string;
  order?: string;
}
export const fetchThemeReviews = async ({
  id,
  take = 20,
  cursor,
  sort,
  order,
}: IFetchThemeReviewProps) => {
  const params = { take } as IFetchThemesProps;
  if (cursor) params.cursor = cursor;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await api.get<{ items: IThemeReview[]; pageInfo: IPage }>(
    `themes/${id}/reviews`,
    {
      params,
    },
  );
  return data;
};

/**
 * 테마 리뷰 작성
 */
export interface IWriteReviewOnThemeProps {
  id: string;
  rating: number;
  success: boolean;
  level: number;
  fear: number;
  activity: number;
  text: string;
}
export const writeReviewOnTheme = async ({
  id,
  rating,
  success,
  level,
  fear,
  activity,
  text,
}: IWriteReviewOnThemeProps) => {
  const body = { rating, success, level, fear, activity, text };
  const { data } = await api.post<boolean>(`themes/${id}/reviews`, body);
  return data;
};

/**
 * 테마 블로그 리뷰 리스트 조회
 */
interface IFetchThemeBlogReviewsProps {
  id: string;
  take?: number;
  cursor?: string;
}
export const fetchThemeBlogReviews = async ({
  id,
  take = 20,
  cursor,
}: IFetchThemeBlogReviewsProps) => {
  const params = { take } as IFetchThemeBlogReviewsProps;
  if (cursor) params.cursor = cursor;

  const { data } = await api.get<{ items: IBlogReview[]; pageInfo: IPage }>(
    `themes/${id}/blog-reviews`,
    {
      params,
    },
  );
  return data;
};
