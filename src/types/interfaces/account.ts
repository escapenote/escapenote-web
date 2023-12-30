import { IUser } from './user';

export interface IAccount {
  id: string;
  provider: string;
  user: IUser;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
