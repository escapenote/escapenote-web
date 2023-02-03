import { ITheme } from 'types';

/**
 * 테마
 */
export interface ICafe {
  id: string;
  areaA: string;
  areaB: string;
  name: string;
  intro: string;
  addressLine: string;
  lat: number;
  lng: number;
  images: string[];
  website: string;
  tel: string;
  openingHours: IOpeningHour[];
  closingHour: number;
  themes: ITheme[];
  saves: any[];
  reviewsRating: number;
  reviewsCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IOpeningHour {
  day: string;
  openTime: string;
  closeTime: string;
}
