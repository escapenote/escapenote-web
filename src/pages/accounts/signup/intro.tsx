import { useRouter } from 'next/router';

import SignupIntro from 'components/pages/SignupIntro';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupIntroPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="약관 동의 - 이스케이프노트"
        description="약관 동의"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/intro`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <SignupIntro />
      </Layout>
    </>
  );
};

export default SignupIntroPage;
