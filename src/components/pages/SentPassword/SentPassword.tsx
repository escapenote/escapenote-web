import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Box, Button } from 'components/atoms';
import imgConfirmCode from 'assets/images/confirm-code.svg';

const SentPassword: React.FC = () => {
  const router = useRouter();

  function handleGoToLogin() {
    router.push('/accounts/login');
  }

  return (
    <Box flex="1">
      <Box alignItems="center" mt="95px" mb="48px">
        <img
          src={imgConfirmCode}
          alt="input-code"
          width="218.67px"
          height="136px"
        />
      </Box>

      <Box alignItems="center" mb="24px">
        <Title>
          성공적으로
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
  font-weight: 500;
  line-height: 30px;
  text-align: center;
`;

export default SentPassword;
