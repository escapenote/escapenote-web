import { useRouter } from 'next/router';

import SentPassword from 'components/pages/SentPassword';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SentPasswordPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="임시 비밀번호 발급 완료 - 이스케이프노트"
        description="임시 비밀번호 발급 완료"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/password/sent`}
      />

      <Layout leftAction={<Back onClick={router.back} />} noBottom>
        <SentPassword />
      </Layout>
    </>
  );
};

export default SentPasswordPage;
