import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppSelector } from 'store';
import FetchMore from 'components/templates/FetchMore';
import ReviewCard from 'components/molecules/ReviewCard';

interface IProps {
  id: string;
}
const ThemeReviews: React.FC<IProps> = ({ id }) => {
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

  return (
    <>
      {status === 'loading' ? (
        <Loading>로딩중...</Loading>
      ) : status === 'error' ? (
        <Error>에러</Error>
      ) : data && data.pages.length > 0 && data.pages[0].items.length === 0 ? (
        <NoData>데이터 없음</NoData>
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
const Items = styled.ul`
  margin-top: -12px;
`;
const Item = styled.li`
  border-bottom: 1px solid rgb(var(--border));
  :last-of-type {
    border-bottom: none;
  }
`;

export default ThemeReviews;
