import { ICafe } from './cafe';

/**
 * 테마
 */
export interface ITheme {
  id: string;
  cafe: ICafe;
  cafeId: string;
  name: string;
  intro: string;
  thumbnail: string;
  genre: string;
  price: number;
  lockingRatio: number;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  openDate: string;
  detailUrl: string;
  reservationUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
