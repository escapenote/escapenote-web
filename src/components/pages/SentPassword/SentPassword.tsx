import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { obscureEmail } from 'utils/common';
import { useAppSelector } from 'store';
import { Box, Button } from 'components/atoms';
import imgConfirmCode from 'assets/images/confirm-code.svg';

const SentPassword: React.FC = () => {
  const router = useRouter();
  const email = useAppSelector(state => state.password.email);

  useEffect(() => {
    if (!email) {
      router.replace('/accounts/password/forgot');
    }
  }, [router, email]);

  function handleGoToLogin() {
    router.push('/accounts/login');
  }

  return (
    <Box flex="1">
      <Box alignItems="center" mt="95px" mb="24px">
        <img
          src={imgConfirmCode}
          alt="input-code"
          width="218.67px"
          height="136px"
        />
      </Box>

      <Box alignItems="center" mb="24px">
        <Value>{obscureEmail(email)}</Value>
      </Box>

      <Box alignItems="center" mb="24px">
        <Title>
          입력하신 이메일로
          <br />
          임시비밀번호가 발급되었습니다.
        </Title>
      </Box>

      <Box mt="auto">
        <Button type="submit" kind="primary" onClick={handleGoToLogin}>
          로그인
        </Button>
      </Box>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
`;
const Value = styled.strong`
  font-size: 14px;
  color: rgb(var(--greyscale400));
  line-height: 21px;
`;

export default SentPassword;
