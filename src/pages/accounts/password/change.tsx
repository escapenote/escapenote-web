import { useRouter } from 'next/router';

import ChangePassword from 'components/pages/ChangePassword';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const ChangePasswordPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="비밀번호 변경 - Escape Note"
        description="비밀번호 변경"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/password/change`}
      />

      <Layout
        title="비밀번호 변경"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        hideBottom
      >
        <ChangePassword />
      </Layout>
    </>
  );
};

export default ChangePasswordPage;
