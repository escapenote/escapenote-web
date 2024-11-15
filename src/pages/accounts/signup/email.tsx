import { useRouter } from 'next/router';

import SignupEmail from 'components/pages/SignupEmail';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="이메일로 회원가입 - 이스케이프노트"
        description="이메일로 회원가입"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/email`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <SignupEmail />
      </Layout>
    </>
  );
};

export default SignupPage;
