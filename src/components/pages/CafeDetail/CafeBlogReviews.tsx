import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import { ICafe } from 'types';
import FetchMore from 'components/templates/FetchMore';
import BlogReviewCard from 'components/molecules/BlogReviewCard';
import GoogleAdsense from 'components/molecules/GoogleAdsense';
import { Box, Text } from 'components/atoms';

interface IProps {
  cafeId: string;
  cafe?: ICafe;
}
const CafeBlogReviews: React.FC<IProps> = ({ cafeId, cafe }) => {
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchCafeBlogReviews', cafeId],
    ({ pageParam }) => {
      return api.cafes.fetchCafeBlogReviews({
        id: cafeId,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  return (
    <Wrapper>
      <Container>
        <Box mb="24px">
          <GoogleAdsense style={{ height: '54px' }} slot="9807600775" />
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row" alignItems="center">
            <SubTitle>블로그 리뷰</SubTitle>
            <Box width="6px" />
            <Text
              fontSize="16px"
              fontWeight="700"
              color={
                cafe?.blogReviewsCount === 0
                  ? 'rgb(var(--greyscale500))'
                  : '#0abe16;'
              }
            >
              {cafe?.blogReviewsCount}
            </Text>
          </Box>
        </Box>

        {status === 'loading' ? (
          <Loading>로딩중...</Loading>
        ) : status === 'error' ? (
          <Error>에러</Error>
        ) : data &&
          data.pages.length > 0 &&
          data.pages[0].items.length === 0 ? (
          <NoData>데이터 없음</NoData>
        ) : (
          data?.pages.map((group, i: number) => (
            <React.Fragment key={i}>
              <Items>
                {group.items?.map(item => (
                  <Item key={item.id}>
                    <BlogReviewCard review={item} />
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div`
  padding: 18px 24px;
`;
const SubTitle = styled.strong`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
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

export default CafeBlogReviews;
