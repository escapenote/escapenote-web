import { api } from 'api';
import { IPage, ITheme } from 'types';

/**
 * 테마 리스트 조회
 */
interface IFetchThemesProps {
  genre?: string;
  areaB?: string;
  level?: string;
  take?: number;
  cursor?: string;
}
export const fetchThemes = async ({
  genre,
  areaB,
  level,
  take = 20,
  cursor,
}: IFetchThemesProps) => {
  const params = { take, cursor } as any;
  if (genre) params.genre = genre;
  if (areaB) params.areaB = areaB;
  if (level) params.level = Number(level);

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
