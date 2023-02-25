import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import { useAppSelector } from 'store';
import CafeFilters from './CafeFilters';
import NoXAxisScrollBar from 'components/templates/NoXAxisScrollBar';
import FetchMore from 'components/templates/FetchMore';
import CafeCard from 'components/molecules/CafeCard';
import GoogleAdsense from 'components/molecules/GoogleAdsense';
import { Box } from 'components/atoms';

const CafeListPage = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const areaA = String(router.query.areaA ?? '');
  const areaB = String(router.query.areaB ?? '');

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
    ['fetchCafes', Boolean(user), areaA, areaB, sort, order],
    ({ pageParam }) => {
      return api.cafes.fetchCafes({
        areaA,
        areaB,
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
          <CafeFilters />
        </NoXAxisScrollBar>
      </Box>

      <Ads />

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
              {i !== 0 && <Ads />}

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

const Ads = () => {
  const colorTheme = useAppSelector(state => state.common.theme);
  return (
    <>
      {colorTheme && (
        <GoogleAdsense
          format="fluid"
          layoutKey="-go+s-2u-bd+v6"
          slot={colorTheme === 'light' ? '1593526920' : '3723036241'}
        />
      )}
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

export default CafeListPage;
