import { useRouter } from 'next/router';

import SignupConfirm from 'components/pages/SignupConfirm';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupConfirmPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="회원가입 확인 - Escape Note"
        description="회원가입 확인"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/confirm`}
      />

      <Layout leftAction={<Back onClick={router.back} />} hideBottom>
        <SignupConfirm />
      </Layout>
    </>
  );
};

export default SignupConfirmPage;
