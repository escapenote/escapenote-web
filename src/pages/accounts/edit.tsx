import Router, { useRouter } from 'next/router';

import { wrapper } from 'store';
import EditProfile from 'components/pages/EditProfile';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const EditProfilePage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="프로필 수정 - 이스케이프노트"
        description="프로필 수정"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/accounts/edit`}
      />

      <Layout
        title="프로필 수정"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        noBottom
      >
        <EditProfile />
      </Layout>
    </>
  );
};

EditProfilePage.getInitialProps = wrapper.getInitialPageProps(
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

export default EditProfilePage;
