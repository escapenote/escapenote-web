import { ITheme } from './theme';

/**
 * 테마
 */
export interface ICafe {
  id: string;
  areaA: string;
  areaB: string;
  name: string;
  addressLine: string;
  lat: number;
  lng: number;
  images: string[];
  website: string;
  tel: string;
  openingHour: number;
  closingHour: number;
  themes: ITheme[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
