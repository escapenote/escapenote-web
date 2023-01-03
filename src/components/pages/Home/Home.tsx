import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import Layout from 'components/templates/Layout';
import CafeCard from 'components/molecules/CafeCard';
import ThemeBigCard from 'components/molecules/ThemeBigCard';
import SearchBar from 'components/molecules/SearchBar';
import { Box } from 'components/atoms';
import NoXAxisScrollBar from 'components/templates/NoXAxisScrollBar';

const HomePage = () => {
  const router = useRouter();

  const {
    isLoading: isCafeLoading,
    data: cafes,
    error: cafeError,
  } = useQuery(['fetchCafes', 'home'], () => {
    return api.cafes.fetchCafes({});
  });

  const {
    isLoading: isThemeLoading,
    data: themes,
    error: themeError,
  } = useQuery(['fetchThemes', 'home'], () => {
    return api.themes.fetchThemes({});
  });

  function handleSearch(term: string) {
    router.push(`/search?tab=all&q=${term}`);
  }

  return (
    <>
      <Layout title="ESCAPE NOTE" subTitle="방탈출 찾을 땐">
        <Section>
          <Box height="56px">
            <SearchBar
              placeholder="방탈출 카페 및 테마 찾기"
              onSearch={handleSearch}
            />
          </Box>
        </Section>

        <Section>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="18px"
          >
            <Title>추천 테마</Title>
            <Link href="/themes" passHref>
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
            <Box mx="-24px">
              <NoXAxisScrollBar>
                <Box width="24px" />
                {themes?.items.slice(0, 4).map(item => (
                  <ThemeItem key={item.id}>
                    <ThemeBigCard theme={item} />
                  </ThemeItem>
                ))}
              </NoXAxisScrollBar>
            </Box>
          )}
        </Section>

        <Section>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="18px"
          >
            <Title>추천 방탈출 카페</Title>
            <Link href="/cafes" passHref>
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
                  <CafeCard cafe={item} />
                </CafeItem>
              ))}
            </CafeItems>
          )}
        </Section>
      </Layout>
    </>
  );
};

const Section = styled.section`
  margin-bottom: 36px;
`;
const Title = styled.strong`
  font-size: 16px;
  font-weight: 700;
`;
const More = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--primary));
`;
const Loading = styled.strong`
  font-size: 16px;
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
const ThemeItem = styled.div`
  margin-right: 16px;
`;

export default HomePage;
