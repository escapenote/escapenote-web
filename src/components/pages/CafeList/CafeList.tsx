import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import Layout from 'components/templates/Layout';
import FetchMore from 'components/templates/FetchMore';
import CafeCard from 'components/molecules/CafeCard';
import IconFilter from 'components/icons/IconFilter';
import iconSearch from 'assets/icons/search.svg';
import CafeFilter from './CafeFilter';

const CafeListPage = () => {
  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');

  const isActiveFilter = Boolean(areaB);
  const [isOpen, setOpen] = useState(false);

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchCafes', areaB],
    ({ pageParam }) => {
      return api.cafes.fetchCafes({
        areaB,
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
        title="방탈출 카페"
        rightAction={
          <>
            <ActionButton
              style={{ marginRight: '16px' }}
              onClick={() => router.push('/search?tab=cafe')}
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
                    <CafeCard cafe={item} />
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

      <CafeFilter isOpen={isOpen} onClose={() => setOpen(false)} />
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

export default CafeListPage;
