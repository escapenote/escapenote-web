import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Faq from 'components/pages/Faq';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const FaqPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="자주묻는질문 - Escape Note"
        description="자주묻는질문"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/faq`}
      />

      <Layout
        title="자주묻는질문"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        hideBottom
      >
        <Faq />
      </Layout>
    </>
  );
};

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export default FaqPage;
