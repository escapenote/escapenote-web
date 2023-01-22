import { api } from 'api';
import { IPage, ITheme } from 'types';

/**
 * 테마 리스트 조회
 */
interface IFetchThemesProps {
  term?: string;
  cafeId?: string;
  genre?: string;
  areaB?: string;
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
  if (areaB) params.areaB = areaB;
  if (genre) params.genre = genre;
  if (level) params.level = Number(level);
  if (person) params.person = Number(person);
  if (fearScore) params.fearScore = fearScore;
  if (activity) params.activity = activity;
  if (lockingRatio) params.lockingRatio = lockingRatio;
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
