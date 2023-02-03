import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from 'store';
import { resetReviewTypeAndId } from 'store/reviewSlice';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';
import CreateCafeReview from './CreateCafeReview';
import CreateThemeReview from './CreateThemeReview';

const CreateReview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { type, id } = useAppSelector(state => state.review);

  useEffect(() => {
    if (!type || !id) {
      alert('잘못된 접근입니다. 메인페이지로 이동합니다.');
      router.replace('/');
    }
  }, [router, type, id]);

  useEffect(() => {
    return () => {
      dispatch(resetReviewTypeAndId());
    };
  }, []);

  return (
    <Layout
      title="리뷰 작성"
      leftAction={<Back onClick={router.back} />}
      rightAction={<></>}
      noBottom
    >
      {type === 'cafe' ? (
        <CreateCafeReview id={id} />
      ) : (
        <CreateThemeReview id={id} />
      )}
    </Layout>
  );
};

export default CreateReview;
