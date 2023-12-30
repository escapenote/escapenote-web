import { api } from 'api';
import { IUser } from 'types';

/**
 * 토큰 재발행
 */
interface RefreshTokenRes {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
  user: IUser;
}
export const refreshToken = () => {
  return api.post<RefreshTokenRes>('/auth/refresh');
};

/**
 * 내 정보 조회
 */
export const fetchProfile = async () => {
  const { data } = await api.get<IUser>('/auth/profile');
  return data;
};

/**
 * 내 정보 수정
 */
export interface IUpdateProfileProps {
  avatar?: string;
  nickname?: string;
  type?: string;
}
export const updateProfile = (body: IUpdateProfileProps) => {
  return api.patch<IUser>('/auth/profile/edit', body);
};

/**
 * 비밀번호 변경
 */
export interface IChangePasswordProps {
  oldPassword?: string;
  newPassword: string;
}
export const changePassword = (body: IChangePasswordProps) => {
  return api.patch('/auth/password/change', body);
};

/**
 * 닉네임 중복 확인
 */
export interface ICheckForDuplicateNicknameProps {
  nickname: string;
}
export const checkForDuplicateNickname = (
  data: ICheckForDuplicateNicknameProps,
) => {
  return api.post('/auth/nickname/duplicate', data);
};

/**
 * 이메일 중복 확인
 */
export interface ICheckForDuplicateEmailProps {
  email: string;
}
export const checkForDuplicateEmail = (data: ICheckForDuplicateEmailProps) => {
  return api.post('/auth/email/duplicate', data);
};

/**
 * 이메일로 인증코드 발송
 */
export interface ISendCodeByEmailProps {
  email: string;
}
export const sendCodeByEmail = (data: ISendCodeByEmailProps) => {
  return api.post('/auth/email/send_code', data);
};

/**
 * 이메일로 받은 인증코드 확인
 */
export interface IVerifyCodeByEmailProps {
  email: string;
  code: string;
}
export const verifyCodeByEmail = (data: IVerifyCodeByEmailProps) => {
  return api.post('/auth/email/verify_code', data);
};

/**
 * 임시 비밀번호 발급
 */
export interface ISendTemporaryPasswordProps {
  email: string;
}
export const sendTemporaryPassword = (data: ISendTemporaryPasswordProps) => {
  return api.post('/auth/email/send_password', data);
};

/**
 * 이메일로 로그인
 */
export interface ILoginByEmailProps {
  email: string;
  password: string;
}
export interface ILoginByEmailRes {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
  user: IUser;
}
export const loginByEmail = ({ email, password }: ILoginByEmailProps) => {
  const data = { email, password };
  return api.post<ILoginByEmailRes>('/auth/login/email', data);
};

/**
 * 이메일로 회원가입
 */
export interface ISignupByEmailProps {
  email: string;
  password: string;
  code: string;
  avatar?: string;
  nickname: string;
  type: string;
  agreeMarketing: boolean;
}
export interface ISignupByEmailRes {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
  user: IUser;
}
export const signupByEmail = (data: ISignupByEmailProps) => {
  return api.post<ISignupByEmailRes>('/auth/signup/email', data);
};

/**
 * 소셜로 회원가입
 */
export interface ISignupBySocialProps {
  avatar?: string;
  nickname: string;
  type: string;
  agreeMarketing: boolean;
}
export interface ISignupBySocialRes {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
  user: IUser;
}
export const signupBySocial = (data: ISignupBySocialProps) => {
  return api.post<ISignupBySocialRes>('/auth/signup/social', data);
};

/**
 * 로그아웃
 */
export const logout = () => {
  return api.post('/auth/logout');
};
