import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Layout from 'components/templates/Layout';
import { Box, Button } from 'components/atoms';
import imgNoFavoritesFound from 'assets/images/no-favorites-found.svg';

const PublicSaved = () => {
  const router = useRouter();

  return (
    <Layout title="찜">
      <Container>
        <Box mt="88px" mb="36px">
          <img
            src={imgNoFavoritesFound}
            alt="no-favorites-found"
            width="218px"
            height="136px"
          />
        </Box>

        <Box mb="8px">
          <Title>
            찜 리스트를 확인하려면
            <br />
            로그인 하세요
          </Title>
        </Box>

        <Box mb="28px">
          <Desc>
            로그인한 후 찜 리스트를
            <br />
            조회 및 추가할 수 있습니다.
          </Desc>
        </Box>

        <Box width="180px">
          <Button kind="primary" onClick={() => router.push('/accounts/login')}>
            로그인
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
`;
const Desc = styled.p`
  color: rgb(var(--greyscale400));
  line-height: 21px;
  text-align: center;
`;

export default PublicSaved;
