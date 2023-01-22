import styled from '@emotion/styled';

import Privacy from 'components/pages/Privacy';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Box } from 'components/atoms';

const PrivacyPage = () => {
  return (
    <>
      <HeadPageMeta
        title="개인정보 처리방침 - Escape Note"
        description="개인정보 처리방침"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/privacy`}
      />

      <Layout
        appBar={
          <Box justifyContent="center" alignItems="center" flex="1">
            <Title>개인정보 처리방침</Title>
          </Box>
        }
        hideBottom
      >
        <Privacy />
      </Layout>
    </>
  );
};

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export default PrivacyPage;
