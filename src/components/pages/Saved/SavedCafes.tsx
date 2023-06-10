import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import FetchMore from 'components/templates/FetchMore';
import CafeCard from 'components/molecules/CafeCard';
import ThemeAds from 'components/molecules/ThemeAds';

const SavedCafes = () => {
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['fetchSavedCafes'],
    ({ pageParam }) => {
      return api.users.fetchSavedCafes({
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage?.pageInfo.endCursor,
    },
  );

  return (
    <>
      <ThemeAds lightSlot="5133047188" darkSlot="6670873022" />

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
              {i !== 0 && (
                <ThemeAds lightSlot="5133047188" darkSlot="6670873022" />
              )}

              {group.items?.map(item => (
                <Item key={item.id}>
                  <CafeCard cafe={item} refetch={refetch} />
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
const NoData = styled(Loading)``;
const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.li`
  margin-right: 18px;
  margin-bottom: 18px;
  width: calc(50% - 9px);
  :nth-of-type(2n) {
    margin-right: 0;
  }
`;

export default SavedCafes;
