import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import { ITheme } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { setReviewTypeAndId } from 'store/reviewSlice';
import FetchMore from 'components/templates/FetchMore';
import ReviewCard from 'components/molecules/ReviewCard';
import { Box, Stars, Text } from 'components/atoms';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeReviews: React.FC<IProps> = ({ id, theme }) => {
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
    ['fetchThemeReviews', Boolean(user), id],
    ({ pageParam }) => {
      return api.themes.fetchThemeReviews({
        id,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  const getRatingText = (rating: number) => {
    if (rating > 3.9) return '꽃길';
    else if (rating > 1.9) return '풀길';
    else if (rating > 0) return '흙길';
    else return '리뷰쓰길';
  };

  function handleWriteReview() {
    dispatch(setReviewTypeAndId({ type: 'theme', id }));
    if (user) {
      router.push('/create/review');
    } else {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
    }
  }

  const reviewsCount = theme?.reviewsCount ?? 0;

  return (
    <>
      <Dashboard>
        <RatingBox>
          <RatingLeftBox>
            <Text
              fontSize="32px"
              fontWeight="700"
              color={
                reviewsCount === 0
                  ? 'rgb(var(--greyscale500))'
                  : 'rgb(var(--text))'
              }
            >
              {getRatingText(theme?.reviewsRating ?? 0)}
            </Text>
            <Stars size="19px" rating={theme?.reviewsRating} />
          </RatingLeftBox>
          <RatingRightBox>
            <div>
              <Text fontSize="12px">체감난이도</Text>
              <Stars size="14px" rating={theme?.reviewsLevel} />
            </div>
            <div>
              <Text fontSize="12px">공포도</Text>
              <Stars size="14px" rating={theme?.reviewsFear} />
            </div>
            <div>
              <Text fontSize="12px">활동성</Text>
              <Stars size="14px" rating={theme?.reviewsActivity} />
            </div>
          </RatingRightBox>
        </RatingBox>
        <ReviewDesc>
          ※ 악의적 내용과 스포일러 등이 포함된 글은 삭제될 수 있습니다.
        </ReviewDesc>
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
                    <ReviewCard type="theme" review={item} />
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
  border-bottom: 1px solid rgb(var(--border));
`;
const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 24px 16px;
  height: 108px;
  background-color: rgb(var(--background));
`;
const RatingLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.9;
  padding-right: 16px;
`;
const RatingRightBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.1;
  border-left: 1px solid rgb(var(--disabled));
  padding-left: 16px;
  > div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 2px 0;
  }
  span:first-of-type {
    margin-right: 8px;
  }
`;
const ReviewDesc = styled.p`
  margin-bottom: 12px;
  font-size: 12px;
  text-align: center;
`;
const WriteReviewButton = styled.button`
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
  border-bottom: 1px solid rgb(var(--greyscale100));
  :last-of-type {
    border-bottom: none;
  }
`;

export default ThemeReviews;
