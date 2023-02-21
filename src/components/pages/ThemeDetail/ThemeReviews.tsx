import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppDispatch, useAppSelector } from 'store';
import { setReviewTypeAndId } from 'store/reviewSlice';
import ReviewCard from 'components/molecules/ReviewCard';
import { Box, Button } from 'components/atoms';

interface IProps {
  themeId: string;
  reviewsCount: number;
}
const ThemeReviews: React.FC<IProps> = ({ themeId, reviewsCount }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const { isLoading, data, error } = useQuery(
    ['fetchThemeReviews', Boolean(user), themeId, 5],
    () => {
      return api.themes.fetchThemeReviews({ id: themeId, take: 5 });
    },
  );

  function handleWriteReview() {
    dispatch(setReviewTypeAndId({ type: 'theme', id: themeId }));
    if (user) {
      router.push('/create/review');
    } else {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
    }
  }

  return (
    <>
      <Items>
        {isLoading ? (
          <Loading>로딩중...</Loading>
        ) : error ? (
          <Error>에러</Error>
        ) : data?.items.length === 0 ? (
          <Box justifyContent="center" alignItems="center" height="140px">
            <NoData>방탈출 카페의 첫 리뷰어가 되어주세요!</NoData>
            <WriteReviewButton onClick={handleWriteReview}>
              리뷰쓰기
            </WriteReviewButton>
          </Box>
        ) : (
          data?.items.map(review => (
            <Item key={review.id}>
              <ReviewCard type="theme" review={review} />
            </Item>
          ))
        )}
      </Items>

      {reviewsCount > 5 && (
        <Box my="10px">
          <Button kind="primary">리뷰 더보기({reviewsCount})</Button>
        </Box>
      )}
    </>
  );
};

const Loading = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)`
  margin-bottom: 6px;
`;
const Items = styled.ul``;
const Item = styled.li`
  border-bottom: 1px solid rgb(var(--border));
  :last-of-type {
    border-bottom: none;
  }
`;
const WriteReviewButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--primary));
`;

export default ThemeReviews;
