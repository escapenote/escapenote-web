import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppDispatch, useAppSelector, wrapper } from 'store';
import { setReviewTypeAndId } from 'store/reviewSlice';
import ThemeReviews from 'components/pages/ThemeReviews';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';
import iconEdit from 'assets/icons/edit.svg';

interface IProps {
  initial: boolean;
}
const ThemeReviewsPage = ({ initial }: IProps) => {
  const router = useRouter();
  const id = String(router.query.id);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { data } = useQuery(['fetchTheme', Boolean(user), id], () => {
    return api.themes.fetchTheme({ id });
  });

  function handleGoBack() {
    if (initial) router.push('/');
    else router.back();
  }

  function handleWriteReview() {
    dispatch(setReviewTypeAndId({ type: 'theme', id }));
    router.push('/create/review');
  }

  return (
    <>
      <HeadPageMeta
        title="테마 리뷰 - 이스케이프노트"
        description="방탈출 테마의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes/${id}/reviews`}
      />

      <Layout
        title="리뷰"
        leftAction={<Back onClick={handleGoBack} />}
        rightAction={
          <button onClick={handleWriteReview}>
            <img src={iconEdit} alt="write-review" width="24px" height="24px" />
          </button>
        }
        noBottom
      >
        <ThemeReviews id={id} theme={data} />
      </Layout>
    </>
  );
};

ThemeReviewsPage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ req, query }) => {
      if (req) {
        const id = query.id as string;
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(['fetchTheme', id], () => {
          return api.themes.fetchTheme({ id });
        });
        return { dehydratedState: dehydrate(queryClient), initial: true };
      }
      return { dehydratedState: null, initial: false };
    },
);

export default ThemeReviewsPage;
