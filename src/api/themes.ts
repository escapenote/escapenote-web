import { api } from 'api';
import { IPage, ITheme } from 'types';

/**
 * 테마 리스트 조회
 */
interface IFetchThemesProps {
  cafeId?: string;
  genre?: string;
  areaB?: string;
  level?: string;
  lockingRatio?: string;
  take?: number;
  cursor?: string;
}
export const fetchThemes = async ({
  cafeId,
  genre,
  areaB,
  level,
  lockingRatio,
  take = 20,
  cursor,
}: IFetchThemesProps) => {
  const params = { take, cursor } as any;
  if (cafeId) params.cafeId = cafeId;
  if (genre) params.genre = genre;
  if (areaB) params.areaB = areaB;
  if (level) params.level = Number(level);
  if (lockingRatio) params.lockingRatio = Number(lockingRatio);

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
