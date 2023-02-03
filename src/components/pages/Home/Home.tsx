import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppDispatch, useAppSelector } from 'store';
import { addRecentlySearchKeyword } from 'store/searchSlice';
import Layout from 'components/templates/Layout';
import NoXAxisScrollBar from 'components/templates/NoXAxisScrollBar';
import CafeCard from 'components/molecules/CafeCard';
import ThemeBigCard from 'components/molecules/ThemeBigCard';
import SearchBar from 'components/molecules/SearchBar';
import { Box } from 'components/atoms';
import iconMessage from 'assets/icons/message.svg';

const HomePage = () => {
  const router = useRouter();

  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const slider = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const {
    isLoading: isCafeLoading,
    data: cafes,
    error: cafeError,
    refetch: cafeRefetch,
  } = useQuery(['fetchCafes', 'home', Boolean(user)], () => {
    return api.cafes.fetchCafes({ sort: 'view' });
  });

  const {
    isLoading: isThemeLoading,
    data: themes,
    error: themeError,
    refetch: themeRefetch,
  } = useQuery(['fetchThemes', 'home', Boolean(user)], () => {
    return api.themes.fetchThemes({ sort: 'view' });
  });

  function handleSearch(term: string) {
    dispatch(addRecentlySearchKeyword(term));
    router.push(`/search?tab=all&q=${term}`);
  }

  function handleScrollMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setIsDown(true);
    setIsMove(false);

    if (!slider.current) return;
    const startX = e.pageX - slider.current.offsetLeft;
    setStartX(startX);
    const scrollLeft = slider.current.scrollLeft;
    setScrollLeft(scrollLeft);
  }
  function handleScrollMouseLeave() {
    setIsDown(false);
    setIsMove(false);
  }
  function handleScrollMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    setIsDown(false);
    setIsMove(false);
  }
  function handleScrollMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDown) return;
    e.preventDefault();
    setIsMove(true);

    if (!slider.current) return;
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX) * 1;
    slider.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <>
      <Layout title="이스케이프노트" subTitle="방탈출 찾을 땐">
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
            <Link href="/themes?sort=view" passHref>
              <More>더보기</More>
            </Link>
          </Box>

          {isThemeLoading ? (
            <Loading>로딩중...</Loading>
          ) : themeError ? (
            <Error>에러</Error>
          ) : themes?.items.length === 0 ? (
            <NoData>데이터가 없습니다.</NoData>
          ) : (
            <Box
              mx="-24px"
              onMouseDown={handleScrollMouseDown}
              onMouseLeave={handleScrollMouseLeave}
              onMouseUp={handleScrollMouseUp}
              onMouseMove={handleScrollMouseMove}
            >
              <NoXAxisScrollBar ref={slider}>
                <Box width="24px" />
                {themes?.items.slice(0, 4).map(item => (
                  <ThemeItem key={item.id} preventClick={isDown && isMove}>
                    <ThemeBigCard theme={item} refetch={themeRefetch} />
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
            <Link href="/cafes?sort=view" passHref>
              <More>더보기</More>
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

        <Section>
          <Question href="mailto:escapenote.team@gmail.com">
            <QuestionIconBox>
              <img src={iconMessage} alt="문의" width="24px" height="24px" />
            </QuestionIconBox>
            <Box ml="12px">
              <QuestionTitle>문의하기</QuestionTitle>
              <QuestionText>
                이스케이프노트에 대해 궁금하신 점이 있으신가요?
              </QuestionText>
            </Box>
          </Question>
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
const ThemeItem = styled.div<{ preventClick: boolean }>`
  margin-right: 16px;
  pointer-events: ${p => (p.preventClick ? 'none' : 'auto')};
`;
const Question = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const QuestionIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  background: rgb(var(--primary));
`;
const QuestionTitle = styled.strong`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
`;
const QuestionText = styled.p`
  font-size: 12px;
  color: rgb(var(--greyscale500));
`;

export default HomePage;
