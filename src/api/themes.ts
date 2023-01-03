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
  minPrice?: string;
  maxPrice?: string;
  fearScore?: string;
  activity?: string;
  minLockingRatio?: string;
  maxLockingRatio?: string;
  take?: number;
  cursor?: string;
}
export const fetchThemes = async ({
  term,
  cafeId,
  areaB,
  genre,
  level,
  person,
  minPrice,
  maxPrice,
  fearScore,
  activity,
  minLockingRatio,
  maxLockingRatio,
  take = 20,
  cursor,
}: IFetchThemesProps) => {
  const params = { take, cursor } as any;
  if (term) params.term = term;
  if (cafeId) params.cafeId = cafeId;
  if (areaB) params.areaB = areaB;
  if (genre) params.genre = genre;
  if (level) params.level = Number(level);
  if (person) params.person = Number(person);
  if (minPrice) params.minPrice = Number(minPrice);
  if (maxPrice) params.maxPrice = Number(maxPrice);
  if (fearScore) params.fearScore = fearScore;
  if (activity) params.activity = activity;
  if (minLockingRatio) params.minLockingRatio = Number(minLockingRatio);
  if (maxLockingRatio) params.maxLockingRatio = Number(maxLockingRatio);

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
