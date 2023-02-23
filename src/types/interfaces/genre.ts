import { ITheme } from './theme';

/**
 * 장르
 */
export interface IGenre {
  id: string;
  themes: ITheme[];
  createdAt: string;
  updatedAt: string;
}
