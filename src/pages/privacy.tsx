import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Privacy from 'components/pages/Privacy';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const PrivacyPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="개인정보 처리방침 - Escape Note"
        description="개인정보 처리방침"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/privacy`}
      />

      <Layout
        title="개인정보 처리방침"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
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
