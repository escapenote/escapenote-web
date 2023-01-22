import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import sortOptions from 'data/sortOptions';
import { useAppSelector } from 'store';
import Layout from 'components/templates/Layout';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import { Box } from 'components/atoms';
import { IconFilter } from 'components/icons';
import iconSearch from 'assets/icons/search.svg';
import iconArrowsDownUp from 'assets/icons/arrows-down-up.svg';
import ThemeFilter from './ThemeFilter';

const ThemeListPage = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const areaB = String(router.query.areaB ?? '');
  const genre = String(router.query.genre ?? '');
  const level = String(router.query.level ?? '');
  const person = String(router.query.person ?? '');
  const fearScore = String(router.query.fearScore ?? '');
  const activity = String(router.query.activity ?? '');
  const lockingRatio = String(router.query.lockingRatio ?? '');
  const isActiveFilter =
    areaB || genre || level || person || fearScore || activity || lockingRatio;

  const user = useAppSelector(state => state.auth.user);
  const [isOpen, setOpen] = useState(false);

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [
      'fetchThemes',
      Boolean(user),
      areaB,
      genre,
      level,
      person,
      fearScore,
      activity,
      lockingRatio,
      sort,
      order,
    ],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        areaB,
        genre,
        level,
        person,
        fearScore,
        activity,
        lockingRatio,
        cursor: pageParam,
        sort,
        order,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  function handleChagneSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const [selectSort, selectOrder] = e.target.value.split('-');
    const query = { ...router.query, sort: selectSort, order: selectOrder };
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
            <select
              defaultValue={`${sort}-${order}`}
              value={`${sort}-${order}`}
              onChange={handleChagneSortOrder}
            >
              <option value="createdAt-desc">최신순</option>
              <option value="view-desc">인기순</option>
              <option value="level-desc">난이도 높은순</option>
              <option value="level-asc">난이도 낮은순</option>
              <option value="price-desc">금액 높은순</option>
              <option value="price-asc">금액 낮은순</option>
              <option value="fear-desc">공포도 높은순</option>
              <option value="fear-asc">공포도 낮은순</option>
              <option value="activity-desc">활동성 높은순</option>
              <option value="activity-asc">활동성 낮은순</option>
            </select>
            <img src={iconArrowsDownUp} alt="sort" width="14px" height="14px" />
            {sortOptions[`${sort}-${order}`]}
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
