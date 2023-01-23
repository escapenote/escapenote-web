import { api } from 'api';
import { ICafe, IPage, ITheme, IUser } from 'types';

/**
 * 대상 사용자 정보 조회
 */
interface IFetchUserProps {
  nickname: string;
}
export const fetchUser = async ({ nickname }: IFetchUserProps) => {
  const params = { nickname };
  const { data } = await api.get<IUser>('/users', { params });
  return data;
};

/**
 * 저장된 카페 리스트 조회
 */
interface IFetchSavedCafesProps {
  take?: number;
  cursor?: string;
}
export const fetchSavedCafes = async ({
  take = 20,
  cursor,
}: IFetchSavedCafesProps) => {
  const params = { take } as any;
  if (cursor) params.cursor = cursor;

  const { data } = await api.get<{ items: ICafe[]; pageInfo: IPage }>(
    '/users/saved_cafes',
    { params },
  );
  return data;
};

/**
 * 저장된 테마 리스트 조회
 */
interface IFetchSavedThemesProps {
  take?: number;
  cursor?: string;
}
export const fetchSavedThemes = async ({
  take = 20,
  cursor,
}: IFetchSavedThemesProps) => {
  const params = { take } as any;
  if (cursor) params.cursor = cursor;

  const { data } = await api.get<{ items: ITheme[]; pageInfo: IPage }>(
    '/users/saved_themes',
    { params },
  );
  return data;
};
