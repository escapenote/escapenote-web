import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Box, Text } from 'components/atoms';
import iconLogoSymbol from 'assets/icons/logo-symbol.svg';
import iconGoogle from 'assets/icons/google.svg';
import iconKakao from 'assets/icons/kakao.svg';
import iconNaver from 'assets/icons/naver.svg';

const Login = () => {
  return (
    <Box flex="1">
      <Box justifyContent="center" alignItems="center" flex="1">
        <Box mb="15px">
          <img
            src={iconLogoSymbol}
            alt="escapenote"
            width="69.1px"
            height="70.36px"
          />
        </Box>
        <Title>
          <small>방탈출의 모든 것</small>이스케이프노트
        </Title>
      </Box>

      <Box gap="16px" mb="54px">
        {/* TODO: 구글 인증 후 활성화 */}
        {/* <GoogleButton href={`${process.env.NEXT_PUBLIC_API}/auth/login/google`}>
          <img src={iconGoogle} alt="google" width="23px" height="23px" />
          구글로 시작하기
        </GoogleButton> */}
        <NaverButton href={`${process.env.NEXT_PUBLIC_API}/auth/login/naver`}>
          <img src={iconNaver} alt="naver" width="16px" height="16px" />
          네이버로 시작하기
        </NaverButton>
        <KakaoButton href={`${process.env.NEXT_PUBLIC_API}/auth/login/kakao`}>
          <img src={iconKakao} alt="kakao" width="18px" height="18px" />
          카카오로 시작하기
        </KakaoButton>
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Link href="/accounts/login/email">
            <a>
              <Text fontSize="14px" fontWeight="500" color="rgb(var(--text))">
                이메일 로그인
              </Text>
            </a>
          </Link>
          <Line />
          <Link href="/accounts/signup/intro">
            <a>
              <Text fontSize="14px" fontWeight="500" color="rgb(var(--text))">
                이메일 회원가입
              </Text>
            </a>
          </Link>
        </Box>
      </Box>

      <Box alignItems="center" mt="auto">
        <Box>
          <Text fontSize="12px" color="rgb(var(--greyscale400))">
            계정에 문제가 있으신가요?
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="baseline">
          <Link href="/faq">
            <a>
              <Text fontSize="12px" fontWeight="500" color="rgb(var(--text))">
                자주묻는질문
              </Text>
            </a>
          </Link>
          <Text fontSize="12px" color="rgb(var(--greyscale400))">
            을 확인해보세요.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  small {
    display: block;
    font-size: 16px;
    color: rgb(var(--greyscale400));
  }
`;
const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  height: 56px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--greyscale900));
`;
const GoogleButton = styled.a`
  ${buttonStyles}
  border: 1px solid rgb(var(--greyscale300));
  background-color: white;
`;
const KakaoButton = styled.a`
  ${buttonStyles}
  background: #FEE500;
`;
const NaverButton = styled.a`
  ${buttonStyles}
  background: #03C75A;
  color: white;
`;
const Line = styled.span`
  width: 1px;
  height: 10px;
  background-color: rgb(var(--greyscale400));
`;

export default Login;
