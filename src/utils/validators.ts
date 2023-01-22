import * as Yup from 'yup';

// 이메일
export const emailRegex =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// 영문 소문자 숫자 . _
export const nicknameRegex = /^[가-힣a-z\d]{2,12}$/;
// 대소문자, 숫자, 특수문자가 포함된 비밀번호
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%+\\/'!#$\^?:,(){}[\]~\-_.*])[A-Za-z\d@%+\\/'!#$\^?:,(){}[\]~\-_.*]{8,255}$/;

/**
 * 로그인
 */
export const loginSchema = {
  email: Yup.string()
    .required('이메일을 입력해주세요')
    .min(5, '이메일의 최소 크기는 5입니다')
    .max(255, '이메일의 최대 크기는 255입니다'),
  password: Yup.string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호의 최소 크기는 8입니다')
    .max(20, '비밀번호의 최대 크기는 20입니다'),
};

/**
 * 회원가입
 */
export const signupSchema = {
  email: Yup.string()
    .required('이메일은 필수 입니다')
    .email('유효한 이메일이 아닙니다')
    .min(5, '이메일의 최소 크기는 5입니다')
    .max(255, '이메일의 최대 크기는 255입니다'),
  code: Yup.string()
    .required('코드를 입력해주세요')
    .length(6, '코드는 6자리어야 합니다'),
  nickname: Yup.string()
    .required('닉네임을 입력해주세요')
    .min(2, '닉네임의 최소 크기는 2입니다')
    .max(12, '닉네임의 최대 크기는 12입니다')
    .matches(nicknameRegex, '닉네임은 한글, 영문 소문자, 숫자만 가능합니다'),
  password: Yup.string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호의 최소 크기는 8입니다')
    .max(20, '비밀번호의 최대 크기는 20입니다')
    .matches(
      passwordRegex,
      '대소문자, 숫자, 특수문자가 포함된 비밀번호를 입력해주세요',
    ),
};
