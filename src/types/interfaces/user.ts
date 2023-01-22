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
  refreshToken: string;
  avatar: string;
  nickname: string;
  type: string;
  agreeOlder14Years: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  cafeSaves: any[];
  themeSaves: any[];
  createdAt: string;
  updatedAt: string;
}
