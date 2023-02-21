import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import { ICafe } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { setReviewTypeAndId } from 'store/reviewSlice';
import FetchMore from 'components/templates/FetchMore';
import ReviewCard from 'components/molecules/ReviewCard';
import { Box, Stars } from 'components/atoms';

interface IProps {
  cafeId: string;
  cafe?: ICafe;
}
const CafeReviews: React.FC<IProps> = ({ cafeId, cafe }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchCafeReviews', Boolean(user), cafeId],
    ({ pageParam }) => {
      return api.cafes.fetchCafeReviews({
        id: cafeId,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  function handleWriteReview() {
    dispatch(setReviewTypeAndId({ type: 'cafe', id: cafeId }));
    if (user) {
      router.push('/create/review');
    } else {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
    }
  }

  const reviewsCount = cafe?.reviewsCount ?? 0;

  return (
    <>
      <Dashboard>
        <RatingBox>
          <Stars size="40px" rating={cafe?.reviewsRating} />
          <Box width="8px" />
          {(cafe?.reviewsRating ?? 0).toFixed(1)}점({reviewsCount})
        </RatingBox>
        <ReviewDesc>
          ※ 악의적 내용과 스포일러 등이 포함된 글은 삭제될 수 있습니다.
        </ReviewDesc>
        {reviewsCount > 0 && (
          <Box alignItems="flex-end">
            <WriteReviewButton onClick={handleWriteReview}>
              리뷰쓰기
            </WriteReviewButton>
          </Box>
        )}
      </Dashboard>

      <Items>
        {status === 'loading' ? (
          <Loading>로딩중...</Loading>
        ) : status === 'error' ? (
          <Error>에러</Error>
        ) : data &&
          data.pages.length > 0 &&
          data.pages[0].items.length === 0 ? (
          <Box justifyContent="center" alignItems="center" height="140px">
            <NoData>방탈출 카페의 첫 리뷰어가 되어주세요!</NoData>
            <WriteReviewButton onClick={handleWriteReview}>
              리뷰쓰기
            </WriteReviewButton>
          </Box>
        ) : (
          data?.pages.map((group, i: number) => (
            <React.Fragment key={i}>
              <Items>
                {group.items?.map(item => (
                  <Item key={item.id}>
                    <ReviewCard type="cafe" review={item} />
                  </Item>
                ))}
              </Items>
            </React.Fragment>
          ))
        )}

        <FetchMore
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Items>
    </>
  );
};

const Dashboard = styled.div`
  margin-top: 24px;
  border-bottom: 1px solid rgb(var(--border));
`;
const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 33px 24px;
  height: 108px;
  background-color: rgb(var(--background));
  font-size: 18px;
  font-weight: 700;
`;
const ReviewDesc = styled.p`
  margin-bottom: 12px;
  font-size: 12px;
  text-align: center;
`;
const WriteReviewButton = styled.button`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--primary));
`;
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

export default CafeReviews;
