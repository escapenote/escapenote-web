import Router, { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppSelector, wrapper } from 'store';
import CafeReview from 'components/pages/CafeReview';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const CafeReviewPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const user = useAppSelector(state => state.auth.user);
  const { data } = useQuery(['fetchReview', 'cafe', Boolean(user), id], () => {
    return api.cafeReviews.fetchReview({ id });
  });

  return (
    <>
      <HeadPageMeta
        title="리뷰 작성 - 이스케이프노트"
        description="리뷰 작성"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/reviews/${id}/cafe`}
      />

      <Layout
        title="리뷰 작성"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        noBottom
      >
        <CafeReview id={id} review={data} />
      </Layout>
    </>
  );
};

CafeReviewPage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ req, res, query }) => {
      const user = store.getState().auth.user;
      if (!user) {
        if (res) {
          res.writeHead(308, { Location: '/accounts/login' });
          res.end();
        } else {
          Router.push('/accounts/login');
        }
      }

      if (req) {
        const id = query.id as string;
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(
          ['fetchReview', 'cafe', Boolean(user), id],
          () => {
            return api.cafeReviews.fetchReview({ id });
          },
        );
        return { dehydratedState: dehydrate(queryClient) };
      }
      return { dehydratedState: null };
    },
);

export default CafeReviewPage;
