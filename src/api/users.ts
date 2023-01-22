import { api } from 'api';
import { IUser } from 'types';

/**
 * 대상 사용자 정보 조회
 */
interface IFetchUserProps {
  nickname: string;
}
export const fetchUser = async ({ nickname }: IFetchUserProps) => {
  const { data } = await api.get<IUser>(`/users/${nickname}`);
  return data;
};
