import { useRouter } from 'next/router';

import Signup from 'components/pages/Signup';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="회원가입 - Escape Note"
        description="이메일로 회원가입"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/email`}
      />

      <Layout leftAction={<Back onClick={router.back} />} hideBottom>
        <Signup />
      </Layout>
    </>
  );
};

export default SignupPage;
