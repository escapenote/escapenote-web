import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useAppDispatch, useAppSelector } from 'store';
import { addRecentlySearchKeyword } from 'store/searchSlice';
import Layout from 'components/templates/Layout';
import SearchBar from 'components/molecules/SearchBar';
import GoogleAdsense from 'components/molecules/GoogleAdsense';
import { Box, Back, Tag } from 'components/atoms';
import SearchedAll from './SearchedAll';
import SearchedCafes from './SearchedCafes';
import SearchedThemes from './SearchedThemes';
import SearchedGenreList from './SearchedGenreList';

const Search = () => {
  const router = useRouter();
  const tab = String(router.query.tab ?? 'cafe');
  const term = String(router.query.q ?? '');

  const recentlySearchKeywords = useAppSelector(state => state.search.values);
  const dispatch = useAppDispatch();

  function handleChangeTab(activeTab: string) {
    const query = { ...router.query };
    query.tab = activeTab;
    router.replace({ query });
  }

  function handleSubmit(activeTerm: string) {
    if (activeTerm === '') {
      const query = { ...router.query };
      delete query.q;
      router.replace({ query });
    } else {
      dispatch(addRecentlySearchKeyword(activeTerm));
      const query = { ...router.query };
      query.q = activeTerm;
      router.replace({ query });
    }
  }

  return (
    <Layout
      appBar={
        <Box flexDirection="row" alignItems="center" height="100%">
          <Box mr="10px">
            <Back onClick={router.back} />
          </Box>
          <Box flex="1">
            <SearchBar term={term} onSearch={handleSubmit} />
          </Box>
        </Box>
      }
      activeTab={tab}
      tabs={[
        {
          key: 'all',
          label: '통합',
          onClick: () => handleChangeTab('all'),
        },
        {
          key: 'cafe',
          label: '카페',
          onClick: () => handleChangeTab('cafe'),
        },
        {
          key: 'theme',
          label: '테마',
          onClick: () => handleChangeTab('theme'),
        },
        {
          key: 'genre',
          label: '장르',
          onClick: () => handleChangeTab('genre'),
        },
      ]}
      noBottom
    >
      {term ? (
        <Box>
          {tab === 'all' ? (
            <SearchedAll term={term} />
          ) : tab === 'cafe' ? (
            <SearchedCafes term={term} />
          ) : tab === 'theme' ? (
            <SearchedThemes term={term} />
          ) : (
            <SearchedGenreList term={term} />
          )}
        </Box>
      ) : (
        <>
          <Title>다른 방탈러들이 많이 찾고 있어요!</Title>
          <Box flexDirection="row" flexWrap="wrap">
            <Box mr="8px">
              <Tag
                onClick={() => router.push('/themes/clch79ex110270bzshsqi3zho')}
              >
                꼬레아 우라
              </Tag>
            </Box>
            <Box mr="8px">
              <Tag
                onClick={() => router.push('/themes/clbp3pbxq84820bznr9tggvk4')}
              >
                호텔레토
              </Tag>
            </Box>
            <Box mr="8px">
              <Tag
                onClick={() => router.push('/themes/clca1shq113640bzjn1lqvgpj')}
              >
                이웃집또털어
              </Tag>
            </Box>
          </Box>

          <Box height="24px" />

          <Title>최근 사용한 검색어</Title>
          <Box flexDirection="row" flexWrap="wrap">
            {recentlySearchKeywords.length > 0
              ? recentlySearchKeywords.map(v => (
                  <Box key={v} mr="8px" mb="8px">
                    <Tag onClick={() => handleSubmit(v)}>{v}</Tag>
                  </Box>
                ))
              : '없음'}
          </Box>

          <Box height="24px" />

          <Box>
            <GoogleAdsense format="auto" slot="4418708571" />
          </Box>
        </>
      )}
    </Layout>
  );
};

const Title = styled.strong`
  margin-bottom: 8px;
  font-weight: 500;
`;

export default Search;
