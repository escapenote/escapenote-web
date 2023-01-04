import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import sortOptions from 'data/sortOptions';
import Layout from 'components/templates/Layout';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import IconFilter from 'components/icons/IconFilter';
import { Box } from 'components/atoms';
import iconSearch from 'assets/icons/search.svg';
import iconArrowsDownUp from 'assets/icons/arrows-down-up.svg';
import ThemeFilter from './ThemeFilter';

const ThemeListPage = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
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
      sort,
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
        sort,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  function handleChagneSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const query = { ...router.query, sort: e.target.value };
    router.replace({ query });
  }

  return (
    <>
      <Layout
        title="테마"
        rightAction={
          <>
            <ActionButton
              style={{ marginRight: '16px' }}
              onClick={() => router.push('/search?tab=all')}
            >
              <img src={iconSearch} alt="search" width="24px" height="24px" />
            </ActionButton>
            <ActionButton onClick={() => setOpen(true)}>
              <IconFilter color={isActiveFilter ? '#ff8142' : '#111827'} />
            </ActionButton>
          </>
        }
      >
        <Box flexDirection="row" justifyContent="flex-end">
          <Order>
            <select value={sort} onChange={handleChagneSort}>
              <option value="createdAt">최신순</option>
              <option value="view">인기순</option>
              <option value="level">난이도순</option>
              <option value="fear">공포순</option>
              <option value="activity">활동순</option>
            </select>
            <img src={iconArrowsDownUp} alt="sort" width="14px" height="14px" />
            {sortOptions[sort]}
          </Order>
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
const Order = styled.button`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 14px;
  img {
    margin-right: 4px;
  }
  select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    opacity: 0;
    cursor: pointer;
  }
`;
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
