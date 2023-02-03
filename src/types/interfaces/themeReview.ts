import { IUser, ICafe } from 'types';

export interface IThemeReview {
  id: string;
  rating: number;
  success: boolean;
  level: number;
  fear: number;
  activity: number;
  text: string;
  user: IUser;
  userId: string;
  cafe: ICafe;
  cafeId: string;
  createdAt: string;
  updatedAt: string;
}
