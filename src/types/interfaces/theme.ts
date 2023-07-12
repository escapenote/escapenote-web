import { ICafe, IGenre } from 'types';

/**
 * 테마
 */
export interface ITheme {
  id: string;
  cafe: ICafe;
  cafeId: string;
  name: string;
  displayName: string;
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
  saves: any[];
  reviewsRating: number;
  reviewsLevel: number;
  reviewsFear: number;
  reviewsActivity: number;
  reviewsCount: number;
  blogReviewsCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
