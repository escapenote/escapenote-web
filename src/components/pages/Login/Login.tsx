import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ILoginProps } from 'api/auth';
import { useAppDispatch } from 'store';
import { login } from 'store/authSlice';
import { loginSchema } from 'utils/validators';
import { Box, Input, Button } from 'components/atoms';
import iconEmail from 'assets/icons/mail.svg';
import iconPassword from 'assets/icons/password.svg';
import iconEyeOff from 'assets/icons/eye-off.svg';
import iconEye from 'assets/icons/eye.svg';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [submitting, setSubmitting] = useState(false);

  const loginMutation = useMutation(
    (data: ILoginProps) => api.auth.login(data),
    {
      onSuccess: ({ data }) => {
        dispatch(login(data));
        alert('ESCAPE NOTE에 오신걸 환영합니다 🤗');
        const searchParams = new URLSearchParams(location.search);
        const rdUrl = searchParams.get('rd_url');
        if (rdUrl) {
          router.replace(rdUrl);
        } else {
          router.push('/');
        }
        setSubmitting(false);
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  function handleTogglePasswordType() {
    setPasswordType(prev => {
      if (prev === 'password') return 'text';
      else return 'password';
    });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await loginSchema.email.validate(email);
      await loginSchema.password.validate(password);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    loginMutation.mutate({ email, password });
  }

  return (
    <Box flex="1">
      <Box mt="8px" mb="58px">
        <Title>
          <small>방탈출의 모든 것</small>ESCAPE NOTE
        </Title>
      </Box>

      <Box mb="24px">
        <form onSubmit={handleLogin}>
          <Box mb="16px">
            <Box position="relative">
              <Input
                type="text"
                name="email"
                placeholder="이메일"
                auto-apitalize="off"
                maxLength={255}
                value={email}
                prefixIcon={
                  <img src={iconEmail} alt="email" width="20px" height="20px" />
                }
                onChange={handleChangeState}
              />
            </Box>
          </Box>
          <Box mb="16px">
            <Input
              type={passwordType}
              name="password"
              placeholder="비밀번호"
              maxLength={20}
              value={password}
              prefixIcon={
                <img
                  src={iconPassword}
                  alt="password"
                  width="20px"
                  height="20px"
                />
              }
              suffixIcon={
                <button type="button" onClick={handleTogglePasswordType}>
                  <img
                    src={passwordType === 'password' ? iconEyeOff : iconEye}
                    alt="eyes-off"
                    width="20px"
                    height="20px"
                  />
                </button>
              }
              onChange={handleChangeState}
            />
          </Box>

          <Box alignItems="flex-end" mb="66px">
            <Link className="link" href="/accounts/password/forgot">
              <a>비밀번호 찾기</a>
            </Link>
          </Box>

          <Box>
            <Button
              type="submit"
              kind="primary"
              disabled={!email || !password || submitting}
            >
              {submitting ? '로딩중...' : '로그인'}
            </Button>
          </Box>

          <Box my="24px">
            <Or>Or</Or>
          </Box>

          <Box>
            <Button
              type="button"
              onClick={() => router.push('/accounts/signup/intro')}
            >
              회원가입
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  small {
    display: block;
    font-size: 16px;
    color: rgb(var(--greyscale400));
  }
`;
const CountrySelect = styled.select`
  outline: none;
  background: 0 0;
  border: none;
  padding: 4px;
  font-size: 16px;
`;
const Or = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(var(--greyscale400));
  ::before {
    content: '';
    margin-right: 16px;
    width: 100%;
    height: 1px;
    background-color: rgb(var(--greyscale200));
  }
  ::after {
    content: '';
    margin-left: 16px;
    width: 100%;
    height: 1px;
    background-color: rgb(var(--greyscale200));
  }
`;

export default Login;
