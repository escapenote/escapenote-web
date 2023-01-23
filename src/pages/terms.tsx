import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Terms from 'components/pages/Terms';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const TermsPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="이용약관 - Escape Note"
        description="이용약관"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/terms`}
      />

      <Layout
        title="이용약관"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
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
