import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import { useAppSelector } from 'store';
import ThemeFilters from './ThemeFilters';
import NoXAxisScrollBar from 'components/templates/NoXAxisScrollBar';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import GoogleAdsense from 'components/molecules/GoogleAdsense';
import { Box } from 'components/atoms';

const ThemeListPage = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const areaB = String(router.query.areaB ?? '');
  const genre = String(router.query.genre ?? '');
  const level = String(router.query.level ?? '');
  const person = String(router.query.person ?? '');

  const user = useAppSelector(state => state.auth.user);

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['fetchThemes', Boolean(user), areaB, genre, level, person, sort, order],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        areaB,
        genre,
        level,
        person,
        cursor: pageParam,
        sort,
        order,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  return (
    <>
      <Box mx="-24px" mb="24px">
        <NoXAxisScrollBar>
          <ThemeFilters />
        </NoXAxisScrollBar>
      </Box>

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
              <GoogleAdsense layoutKey="-ff+6a-x-eh+tr" slot="3363518566" />

              {group.items?.map(item => (
                <Item key={item.id}>
                  <ThemeCard theme={item} refetch={refetch} />
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
const Items = styled.ul``;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default ThemeListPage;
