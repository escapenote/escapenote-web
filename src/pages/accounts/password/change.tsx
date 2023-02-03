import Router, { useRouter } from 'next/router';

import { wrapper } from 'store';
import ChangePassword from 'components/pages/ChangePassword';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const ChangePasswordPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="비밀번호 변경 - 이스케이프노트"
        description="비밀번호 변경"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/password/change`}
      />

      <Layout
        title="비밀번호 변경"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        noBottom
      >
        <ChangePassword />
      </Layout>
    </>
  );
};

ChangePasswordPage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ res }) => {
      const { user } = store.getState().auth;

      if (!user) {
        if (res) {
          res.writeHead(308, { Location: '/accounts/login' });
          res.end();
        } else {
          Router.push('/accounts/login');
        }
      }

      return {};
    },
);

export default ChangePasswordPage;
