import { useRouter } from 'next/router';

import Login from 'components/pages/Login';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const LoginPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="로그인 - Escape Note"
        description="로그인"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/login`}
      />

      <Layout leftAction={<Back onClick={router.back} />} hideBottom>
        <Login />
      </Layout>
    </>
  );
};

export default LoginPage;
