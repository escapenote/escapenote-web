import { ICafe, ITheme } from 'types';

export interface IBlogReview {
  id: string;

  cafe?: ICafe;
  cafeId?: string;
  theme?: ITheme;
  themeId?: string;
  title: string;
  desc: string;
  url: string;
  thumbnail: string;

  createdAt: string;
  updatedAt: string;
}
