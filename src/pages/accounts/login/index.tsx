import { useRouter } from 'next/router';

import Login from 'components/pages/Login';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="로그인 - 이스케이프노트"
        description="로그인"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/login`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <Login />
      </Layout>
    </>
  );
};

export default Page;
