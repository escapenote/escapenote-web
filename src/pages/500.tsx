import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Box, Button } from 'components/atoms';
import image500 from 'assets/images/500.svg';

const ErrorPage = () => {
  const router = useRouter();

  function goBackHome() {
    router.push('/');
  }

  return (
    <Wrapper>
      <Box mb="60px">
        <img src={image500} alt="error" width="100%" height="100%" />
      </Box>
      <Box mb="20px">
        <Title>500</Title>
      </Box>
      <Box mb="40px">
        <Desc>Internal Server Error</Desc>
      </Box>
      <Button onClick={goBackHome}>Go Back Home</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 100px;
  padding: 24px;
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export default ErrorPage;
