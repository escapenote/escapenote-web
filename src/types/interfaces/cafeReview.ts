import { ICafe, IUser } from 'types';

export interface ICafeReview {
  id: string;
  rating: number;
  text: string;
  user: IUser;
  userId: string;
  cafe: ICafe;
  cafeId: string;
  createdAt: string;
  updatedAt: string;
}
