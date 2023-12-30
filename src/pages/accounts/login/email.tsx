import { useRouter } from 'next/router';

import LoginEmail from 'components/pages/LoginEmail';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const LoginEmailPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="이메일로 로그인 - 이스케이프노트"
        description="이메일로 로그인"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/login/email`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <LoginEmail />
      </Layout>
    </>
  );
};

export default LoginEmailPage;
