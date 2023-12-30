import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ICheckForDuplicateEmailProps, ISendCodeByEmailProps } from 'api/auth';
import { signupSchema } from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { setSignupEmail } from 'store/signupSlice';
import { Box, Input, Button } from 'components/atoms';
import iconEmail from 'assets/icons/mail.svg';

const SignupEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { agreeOlder14Years, agreeTerms, agreePrivacy } = useAppSelector(
    state => state.signup,
  );

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!agreeOlder14Years || !agreeTerms || !agreePrivacy) {
      router.replace('/accounts/signup/intro');
    }
  }, [router, agreeOlder14Years, agreeTerms, agreePrivacy]);

  const confirmDuplicateEmail = useMutation(
    (data: ICheckForDuplicateEmailProps) =>
      api.auth.checkForDuplicateEmail(data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          requestCodeByEmail.mutate({ email });
        }
      },
      onError: ({ response }) => {
        const { status, data } = response;
        if (status === 409) {
          alert('이메일이 중복되었습니다.');
        } else {
          alert(data.detail);
        }
        setSubmitting(false);
      },
    },
  );
  const requestCodeByEmail = useMutation(
    (data: ISendCodeByEmailProps) => api.auth.sendCodeByEmail(data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          dispatch(setSignupEmail(email));
          setSubmitting(false);
          router.push('/accounts/signup/confirm');
        }
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

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await signupSchema.email.validate(email);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    confirmDuplicateEmail.mutate({ email });
  }

  return (
    <>
      <Box>
        <Box>
          <Title>회원가입</Title>
        </Box>

        <Box mb="88px">
          <Desc>이메일로 가입해주세요.</Desc>
        </Box>

        <Form onSubmit={handleSignup}>
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
            <Button
              type="submit"
              kind="primary"
              disabled={!email || submitting}
            >
              {submitting ? '로딩중...' : '인증번호 받기'}
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  );
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default SignupEmail;
