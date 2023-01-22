import { useRouter } from 'next/router';

import SignupComplete from 'components/pages/SignupComplete';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupCompletePage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="회원가입 완료 - Escape Note"
        description="회원가입 완료"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/complete`}
      />

      <Layout leftAction={<Back onClick={router.back} />} hideBottom>
        <SignupComplete />
      </Layout>
    </>
  );
};

export default SignupCompletePage;
