import { IUser, ITheme } from 'types';

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
  theme: ITheme;
  themeId: string;
  createdAt: string;
  updatedAt: string;
}
