import Router from 'next/router';

import { wrapper } from 'store';
import CreateReview from 'components/pages/CreateReview';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const CreateReviewPage = () => {
  return (
    <>
      <HeadPageMeta
        title="리뷰 작성 - 이스케이프노트"
        description="리뷰 작성"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/create/review`}
      />

      <CreateReview />
    </>
  );
};

CreateReviewPage.getInitialProps = wrapper.getInitialPageProps(
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

export default CreateReviewPage;
