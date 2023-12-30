import { IAccount } from './account';
import { ICafeReview } from './cafeReview';
import { IThemeReview } from './themeReview';

/**
 * 사용지
 */
export interface IUser {
  id: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  password: string;
  hasPassword: boolean;
  refreshToken: string;
  avatar: string;
  nickname: string;
  type: string;
  agreeOlder14Years: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  accounts: IAccount[];
  cafeSaves: any[];
  themeSaves: any[];
  cafeReviews: ICafeReview[];
  themeReviews: IThemeReview[];
  createdAt: string;
  updatedAt: string;
}
