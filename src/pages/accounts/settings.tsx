import Router, { useRouter } from 'next/router';

import { wrapper } from 'store';
import Settings from 'components/pages/Settings';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const SettingsPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="설정 - 이스케이프노트"
        description="설정"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/edit`}
      />

      <Layout
        title="설정"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        noBottom
      >
        <Settings />
      </Layout>
    </>
  );
};

SettingsPage.getInitialProps = wrapper.getInitialPageProps(
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

export default SettingsPage;
