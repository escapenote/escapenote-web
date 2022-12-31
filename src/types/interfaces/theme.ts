import { ICafe } from './cafe';
import { IGenre } from './genre';

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
  genre: IGenre[];
  price: number;
  lockingRatio: number;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  fear: number;
  activity: number;
  openDate: string;
  detailUrl: string;
  reservationUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
