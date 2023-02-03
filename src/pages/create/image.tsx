import Router from 'next/router';

import { wrapper } from 'store';
import CreateImage from 'components/pages/CreateImage';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const CreateImagePage = () => {
  return (
    <>
      <HeadPageMeta
        title="이미지 생성 - 이스케이프노트"
        description="이미지 생성"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/create/image`}
      />

      <CreateImage />
    </>
  );
};

CreateImagePage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    ({ res }) => {
      const user = store.getState().auth.user;

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

export default CreateImagePage;
