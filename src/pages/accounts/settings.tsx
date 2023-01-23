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
        title="설정 - Escape Note"
        description="설정"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/edit`}
      />

      <Layout
        title="설정"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        hideBottom
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
          Router.replace('/accounts/login');
        }
      }

      return {};
    },
);

export default SettingsPage;
