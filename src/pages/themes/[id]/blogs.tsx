import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import BlogReviews from 'components/pages/BlogReviews';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

interface IProps {
  initial: boolean;
}
const ThemeBlogReviewsPage = ({ initial }: IProps) => {
  const router = useRouter();
  const id = String(router.query.id);

  function handleGoBack() {
    if (initial) router.push(`/themes/${id}`);
    else router.back();
  }

  return (
    <>
      <HeadPageMeta
        title="테마 블로그 리뷰 - 이스케이프노트"
        description="방탈출 테마의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes/${id}/blogs`}
      />

      <Layout
        title="블로그 리뷰"
        leftAction={<Back onClick={handleGoBack} />}
        rightAction={<></>}
        noBottom
      >
        <BlogReviews id={id} />
      </Layout>
    </>
  );
};

ThemeBlogReviewsPage.getInitialProps = ({ req }: NextPageContext) => {
  if (req) {
    return { initial: true };
  }
  return { initial: false };
};

export default ThemeBlogReviewsPage;
