import styled from '@emotion/styled';

import Terms from 'components/pages/Terms';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Box } from 'components/atoms';

const TermsPage = () => {
  return (
    <>
      <HeadPageMeta
        title="이용약관 - Escape Note"
        description="이용약관"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/terms`}
      />

      <Layout
        appBar={
          <Box justifyContent="center" alignItems="center" flex="1">
            <Title>이용약관</Title>
          </Box>
        }
        hideBottom
      >
        <Terms />
      </Layout>
    </>
  );
};

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export default TermsPage;
