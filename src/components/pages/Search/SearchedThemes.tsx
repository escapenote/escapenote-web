import React from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppSelector } from 'store';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  term: string;
}
const SearchedThemes: React.FC<IProps> = ({ term }) => {
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['fetchThemes', term],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        term,
        cursor: pageParam,
      });
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

const Ads = () => {
  const colorTheme = useAppSelector(state => state.common.theme);
  return (
    <>
      {colorTheme && (
        <GoogleAdsense
          format="fluid"
          layoutKey="-gn+t-2s-c0+w5"
          slot={colorTheme === 'light' ? '3194113708' : '1689460342'}
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
const Items = styled.ul``;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default SearchedThemes;
