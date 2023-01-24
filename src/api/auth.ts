import { api } from 'api';
import { IUser } from 'types';

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
  oldPassword: string;
  newPassword: string;
}
export const changePassword = (body: IChangePasswordProps) => {
  return api.patch('/auth/password/change', body);
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
 * 이메일로 회원가입
 */
export interface ISignupByEmailProps {
  email: string;
  password: string;
  code: string;
  nickname: string;
  type: string;
  agreeOlder14Years: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}
export const signupByEmail = (data: ISignupByEmailProps) => {
  return api.post('/auth/email/signup', data);
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
 * 토큰 재발행
 */
interface IRefreshTokenRes {
  accessToken: string;
  user: IUser;
}
export const refreshToken = (cookies?: string) => {
  let options = undefined;
  if (cookies) {
    options = { headers: { Cookie: cookies } };
  }
  return api.post<IRefreshTokenRes>('/auth/refresh', {}, options);
};

/**
 * 로그인
 */
export interface ILoginProps {
  email: string;
  password: string;
}
interface ILoginRes {
  accessToken: string;
  user: IUser;
}
export const login = ({ email, password }: ILoginProps) => {
  const data = { email, password };

  return api.post<ILoginRes>('/auth/login', data);
};

/**
 * 로그아웃
 */
export const logout = () => {
  return api.post('/auth/logout');
};
