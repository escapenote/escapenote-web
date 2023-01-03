import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import Layout from 'components/templates/Layout';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import IconFilter from 'components/icons/IconFilter';
import iconSearch from 'assets/icons/search.svg';
import ThemeFilter from './ThemeFilter';

const ThemeListPage = () => {
  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');
  const genre = String(router.query.genre ?? '');
  const level = String(router.query.level ?? '');
  const person = String(router.query.person ?? '');
  const minPrice = String(router.query.minPrice ?? '');
  const maxPrice = String(router.query.maxPrice ?? '');
  const fearScore = String(router.query.fearScore ?? '');
  const activity = String(router.query.activity ?? '');
  const minLockingRatio = String(router.query.minLockingRatio ?? '');
  const maxLockingRatio = String(router.query.maxLockingRatio ?? '');

  const isActiveFilter =
    areaB ||
    genre ||
    level ||
    person ||
    minPrice ||
    maxPrice ||
    fearScore ||
    activity ||
    minLockingRatio ||
    maxLockingRatio;
  const [isOpen, setOpen] = useState(false);

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      'fetchThemes',
      areaB,
      genre,
      level,
      person,
      minPrice,
      maxPrice,
      fearScore,
      activity,
      minLockingRatio,
      maxLockingRatio,
    ],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        areaB,
        genre,
        level,
        person,
        minPrice,
        maxPrice,
        fearScore,
        activity,
        minLockingRatio,
        maxLockingRatio,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  return (
    <>
      <Layout
        title="테마"
        rightAction={
          <>
            <ActionButton
              style={{ marginRight: '16px' }}
              onClick={() => router.push('/search?tab=theme')}
            >
              <img src={iconSearch} alt="search" width="24px" height="24px" />
            </ActionButton>
            <ActionButton onClick={() => setOpen(true)}>
              <IconFilter color={isActiveFilter ? '#ff8142' : '#111827'} />
            </ActionButton>
          </>
        }
      >
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
                    <ThemeCard theme={item} />
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
      </Layout>

      <ThemeFilter isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

const ActionButton = styled.button`
  width: 24px;
  height: 24px;
`;
const Loading = styled.strong`
  font-size: 16px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const Items = styled.ul``;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default ThemeListPage;
