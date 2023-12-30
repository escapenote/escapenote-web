import { useRouter } from 'next/router';

import SignupSocial from 'components/pages/SignupSocial';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SignupSocialPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="소셜 회원가입 - 이스케이프노트"
        description="소셜 회원가입"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/signup/social`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <SignupSocial />
      </Layout>
    </>
  );
};

export default SignupSocialPage;
