import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import CafeCard from 'components/molecules/CafeCard';
import ThemeCard from 'components/molecules/ThemeCard';
import GenreCard from 'components/molecules/GenreCard';
import { Box } from 'components/atoms';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  term: string;
}
const SearchedAll: React.FC<IProps> = ({ term }) => {
  const {
    isLoading: isCafeLoading,
    data: cafes,
    error: cafeError,
    refetch: cafeRefetch,
  } = useQuery(['fetchCafes', 'search', term], () => {
    return api.cafes.fetchCafes({ term });
  });

  const {
    isLoading: isThemeLoading,
    data: themes,
    error: themeError,
    refetch: themeRefetch,
  } = useQuery(['fetchThemes', 'search', term], () => {
    return api.themes.fetchThemes({ term });
  });

  const {
    isLoading: isGenreLoading,
    data: genreList,
    error: genreError,
  } = useQuery(['fetchGenreList', 'search', term], () => {
    return api.genre.fetchGenreList({ term });
  });

  return (
    <>
      <Section>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="18px"
        >
          <Title>카페</Title>
          <Link href={`/search?tab=cafe&q=${term}`} passHref>
            <More>전체 보기</More>
          </Link>
        </Box>

        {isCafeLoading ? (
          <Loading>로딩중...</Loading>
        ) : cafeError ? (
          <Error>에러</Error>
        ) : cafes?.items.length === 0 ? (
          <NoData>데이터가 없습니다.</NoData>
        ) : (
          <CafeItems>
            {cafes?.items.slice(0, 4).map(item => (
              <CafeItem key={item.id}>
                <CafeCard cafe={item} refetch={cafeRefetch} />
              </CafeItem>
            ))}
          </CafeItems>
        )}
      </Section>

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt="-18px"
        mb="28px"
      >
        <GoogleAdsense style={{ height: '54px' }} slot="2388298495" />
      </Box>

      <Section>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="18px"
        >
          <Title>테마</Title>
          <Link href={`/search?tab=theme&q=${term}`} passHref>
            <More>전체 보기</More>
          </Link>
        </Box>

        {isThemeLoading ? (
          <Loading>로딩중...</Loading>
        ) : themeError ? (
          <Error>에러</Error>
        ) : themes?.items.length === 0 ? (
          <NoData>데이터가 없습니다.</NoData>
        ) : (
          <ThemeItems>
            {themes?.items.slice(0, 4).map(item => (
              <ThemeItem key={item.id}>
                <ThemeCard theme={item} refetch={themeRefetch} />
              </ThemeItem>
            ))}
          </ThemeItems>
        )}
      </Section>

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mb="28px"
      >
        <GoogleAdsense style={{ height: '54px' }} slot="2388298495" />
      </Box>

      <Section>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="18px"
        >
          <Title>장르</Title>
          <Link href={`/search?tab=genre&q=${term}`} passHref>
            <More>전체 보기</More>
          </Link>
        </Box>

        {isGenreLoading ? (
          <Loading>로딩중...</Loading>
        ) : genreError ? (
          <Error>에러</Error>
        ) : genreList?.length === 0 ? (
          <NoData>데이터가 없습니다.</NoData>
        ) : (
          <GenreItems>
            {genreList?.slice(0, 8).map(item => (
              <GenreItem key={item.id}>
                <GenreCard genre={item} />
              </GenreItem>
            ))}
          </GenreItems>
        )}
      </Section>
    </>
  );
};

const Section = styled.section`
  margin-bottom: 28px;
`;
const Title = styled.strong`
  font-size: 16px;
  font-weight: 700;
`;
const More = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--greyscale400));
`;
const Loading = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const CafeItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const CafeItem = styled.li`
  margin-right: 18px;
  margin-bottom: 18px;
  width: calc(50% - 9px);
  :nth-of-type(2n) {
    margin-right: 0;
  }
`;
const ThemeItems = styled.ul``;
const ThemeItem = styled.li`
  margin-bottom: 18px;
  :last-of-type {
    margin-bottom: 0;
  }
`;
const GenreItems = styled.ul``;
const GenreItem = styled.li`
  margin-bottom: 18px;
`;

export default SearchedAll;
