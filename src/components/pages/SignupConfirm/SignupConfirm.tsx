import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ISendCodeByEmailProps, IVerifyCodeByEmailProps } from 'api/auth';
import { obscureEmail } from 'utils/common';
import { signupSchema } from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { setSignupCode } from 'store/signupSlice';
import { Box, Input, Button } from 'components/atoms';
import iconEdit from 'assets/icons/edit-grey.svg';
import imgValification from 'assets/images/valification.svg';

const SignupConfirm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { agreeOlder14Years, agreeTerms, agreePrivacy, email } = useAppSelector(
    state => state.signup,
  );

  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validateCodeByEmail = useMutation(
    (data: IVerifyCodeByEmailProps) => api.auth.verifyCodeByEmail(data),
    {
      onSuccess: ({ data }) => handleSuccess(data),
      onError: (err: any) => handleError(err),
    },
  );
  const requestCodeByEmail = useMutation(
    (data: ISendCodeByEmailProps) => api.auth.sendCodeByEmail(data),
    {
      onSuccess: () => {
        alert('인증 코드를 재발송 하였습니다.');
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  useEffect(() => {
    if (!agreeOlder14Years || !agreeTerms || !agreePrivacy) {
      router.replace('/accounts/signup/intro');
    } else if (!email) {
      router.replace('/accounts/signup/email');
    }
  }, [router, agreeOlder14Years, agreeTerms, agreePrivacy, email]);

  function handleSuccess(data: any) {
    if (data) {
      dispatch(setSignupCode(code));
      setSubmitting(false);
      router.push('/accounts/signup/complete');
    } else {
      alert('인증 코드가 유효하지 않습니다.');
      setSubmitting(false);
    }
  }

  function handleError(err: any) {
    const { data } = err.response;
    const { detail } = data;
    alert(detail);
    setSubmitting(false);
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value);
  }

  async function handleVerifyCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await signupSchema.code.validate(code);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    validateCodeByEmail.mutate({ email, code });
  }

  function handleRequestCode() {
    requestCodeByEmail.mutate({ email });
  }

  return (
    <Box flex="1">
      <Box alignItems="center" mb="40px">
        <img
          src={imgValification}
          alt="valification"
          width="152px"
          height="152px"
        />
      </Box>

      <Box alignItems="center" mb="8px">
        <Title>인증번호 입력</Title>
      </Box>

      <Box alignItems="center" mb="28px">
        <Desc>아래 번호로 발송된 인증번호를 입력해주세요.</Desc>
        <Value>{obscureEmail(email)}</Value>
      </Box>

      <Form onSubmit={handleVerifyCode}>
        <Box mb="24px">
          <Input
            type="tel"
            name="code"
            placeholder="인증 코드 6자리"
            maxLength={6}
            value={code}
            prefixIcon={
              <img src={iconEdit} alt="code" width="20px" height="20px" />
            }
            onChange={handleCodeChange}
          />
        </Box>

        <Box flexDirection="row" justifyContent="center" mb="24px">
          <Button type="button" kind="text" onClick={handleRequestCode}>
            인증번호 재발송
          </Button>
        </Box>

        <Box mt="auto">
          <Button type="submit" kind="primary" disabled={!code || submitting}>
            {submitting ? '로딩중...' : '인증번호 확인'}
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

export default SignupConfirm;
