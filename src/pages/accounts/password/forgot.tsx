import { useRouter } from 'next/router';

import ForgotPassword from 'components/pages/ForgotPassword';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const ForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="비밀번호 찾기 - 이스케이프노트"
        description="비밀번호 찾기"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/password/forgot`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <ForgotPassword />
      </Layout>
    </>
  );
};

export default ForgotPasswordPage;
