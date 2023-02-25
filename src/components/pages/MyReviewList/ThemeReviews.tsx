import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import FetchMore from 'components/templates/FetchMore';
import MyReviewCard from 'components/molecules/MyReviewCard';
import { useAppSelector } from 'store';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  nickname: string;
}
const ThemeReviews: React.FC<IProps> = ({ nickname }) => {
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchMyThemeReviews', nickname],
    ({ pageParam }) => {
      return api.themeReviews.fetchReviews({ nickname, cursor: pageParam });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  return (
    <>
      <Ads />

      {status === 'loading' ? (
        <Loading>로딩중...</Loading>
      ) : status === 'error' ? (
        <Error>에러</Error>
      ) : data && data.pages.length > 0 && data.pages[0].items.length === 0 ? (
        <NoData>데이터가 없습니다.</NoData>
      ) : (
        data?.pages.map((group, i: number) => (
          <React.Fragment key={i}>
            <Items>
              {i !== 0 && <Ads />}

              {group.items?.map(item => (
                <Item key={item.id}>
                  <MyReviewCard type="theme" review={item} />
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
    </>
  );
};

const Ads = () => {
  const colorTheme = useAppSelector(state => state.common.theme);
  return (
    <>
      {colorTheme && (
        <GoogleAdsense
          format="fluid"
          layoutKey="-gn+l-25-8i+nc"
          slot={colorTheme === 'light' ? '2520725080' : '9824500033'}
        />
      )}
    </>
  );
};

const Loading = styled.strong`
  padding: 16px 0;
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const Items = styled.ul``;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default ThemeReviews;
