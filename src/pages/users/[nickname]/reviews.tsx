import { useRouter } from 'next/router';

import MyReviewList from 'components/pages/MyReviewList';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const MyReviewListPage = () => {
  const router = useRouter();
  const nickname = router.query.nickname as string;

  return (
    <>
      <HeadPageMeta
        title={`${nickname}의 리뷰 작성 내역 - 이스케이프노트`}
        description="방탈출 카페의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/users/${nickname}/reviews`}
      />

      <MyReviewList nickname={nickname} />
    </>
  );
};

export default MyReviewListPage;
