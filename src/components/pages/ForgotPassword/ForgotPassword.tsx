import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ISendCodeByEmailProps } from 'api/auth';
import { signupSchema } from 'utils/validators';
import { useAppDispatch } from 'store';
import { setEmailForForgotPassword } from 'store/passwordSlice';
import { Box, Input, Button } from 'components/atoms';
import iconEmail from 'assets/icons/mail.svg';
import imgInputCode from 'assets/images/input-code.svg';

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sendTemporaryPassword = useMutation(
    (data: ISendCodeByEmailProps) => api.auth.sendTemporaryPassword(data),
    {
      onSuccess: () => {
        dispatch(setEmailForForgotPassword(email));
        setSubmitting(false);
        router.push('/accounts/password/sent');
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleVerifyCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await signupSchema.email.validate(email);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    sendTemporaryPassword.mutate({ email });
  }

  return (
    <Box flex="1">
      <Box alignItems="center" mb="40px">
        <img src={imgInputCode} alt="input-code" width="152px" height="152px" />
      </Box>

      <Box alignItems="center" mb="8px">
        <Title>비밀번호 찾기</Title>
      </Box>

      <Box alignItems="center" mb="52px">
        <Desc>계정 이메일 주소를 입력해주세요.</Desc>
      </Box>

      <Form onSubmit={handleVerifyCode}>
        <Box mb="24px">
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
            onChange={handleEmailChange}
          />
        </Box>

        <Box mt="auto">
          <Button type="submit" kind="primary" disabled={!email || submitting}>
            {submitting ? '로딩중...' : '비밀번호 찾기'}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;
const Desc = styled.p`
  font-size: 14px;
  color: rgb(var(--greyscale400));
  line-height: 21px;
`;
const Value = styled.strong`
  font-weight: 500;
  line-height: 21px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default ForgotPassword;
