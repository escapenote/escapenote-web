import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from 'api';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import iconFilter from 'assets/icons/filter.svg';
import iconMovie from 'assets/icons/movie.svg';
import iconLocation from 'assets/icons/location.svg';
import iconLock from 'assets/icons/lock.svg';

const ThemeListPage = () => {
  const [genre, setGenre] = useState('');
  const [areaB, setAreaB] = useState('');
  const [level, setLevel] = useState('');

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchThemes', genre, areaB, level],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        genre,
        areaB,
        level,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  return (
    <>
      <Filters>
        <FilterItem>
          <img src={iconFilter} alt="filter" width="24px" height="24px" />
        </FilterItem>
        <FilterItem>
          <img
            style={{ marginRight: '5px' }}
            src={iconMovie}
            alt="genre"
            width="24px"
            height="24px"
          />
          <select
            name="genre"
            defaultValue={genre}
            onChange={e => setGenre(e.target.value)}
          >
            <option value="">전체</option>
            <option value="Magical Adventure">Magical Adventure</option>
            <option value="SF">SF</option>
            <option value="SF/드라마">SF/드라마</option>
            <option value="감성">감성</option>
            <option value="감성 추리">감성 추리</option>
            <option value="감성, 힐링">감성, 힐링</option>
            <option value="감성/로맨스">감성/로맨스</option>
            <option value="감성/판타지">감성/판타지</option>
            <option value="감성로맨스">감성로맨스</option>
            <option value="게임">게임</option>
            <option value="고양이/큐트">고양이/큐트</option>
            <option value="공포">공포</option>
            <option value="공포,도전">공포,도전</option>
            <option value="공포,스릴러">공포,스릴러</option>
            <option value="공포/미스터리">공포/미스터리</option>
            <option value="공포/스릴러">공포/스릴러</option>
            <option value="극">극</option>
            <option value="동화">동화</option>
            <option value="동화 어드벤처">동화 어드벤처</option>
            <option value="드라마">드라마</option>
            <option value="드라마 감성">드라마 감성</option>
            <option value="드라마 서사">드라마 서사</option>
            <option value="로맨스">로맨스</option>
            <option value="모험 어드벤처">모험 어드벤처</option>
            <option value="모험 탐험">모험 탐험</option>
            <option value="문제방">문제방</option>
            <option value="문제방 잠입 미션">문제방 잠입 미션</option>
            <option value="문제해결/AI">문제해결/AI</option>
            <option value="미션">미션</option>
            <option value="미션 어드벤처">미션 어드벤처</option>
            <option value="미스터리">미스터리</option>
            <option value="미스터리 스릴러">미스터리 스릴러</option>
            <option value="미스터리 추리">미스터리 추리</option>
            <option value="미스터리 퍼즐">미스터리 퍼즐</option>
            <option value="미스터리/스릴러">미스터리/스릴러</option>
            <option value="복고/뮤지컬">복고/뮤지컬</option>
            <option value="비즈니스19금">비즈니스19금</option>
            <option value="서스펜스">서스펜스</option>
            <option value="스릴러">스릴러</option>
            <option value="스릴러,공포">스릴러,공포</option>
            <option value="스릴러,추리">스릴러,추리</option>
            <option value="스릴러/미스터리">스릴러/미스터리</option>
            <option value="스릴러/추리">스릴러/추리</option>
            <option value="신화판타지">신화판타지</option>
            <option value="액션">액션</option>
            <option value="약한공포 스릴러">약한공포 스릴러</option>
            <option value="어드벤처">어드벤처</option>
            <option value="어드벤처 액션">어드벤처 액션</option>
            <option value="어드벤처 퍼즐">어드벤처 퍼즐</option>
            <option value="역사/작전">역사/작전</option>
            <option value="요리">요리</option>
            <option value="잠입">잠입</option>
            <option value="잠입,스릴러">잠입,스릴러</option>
            <option value="잠입,추리">잠입,추리</option>
            <option value="잠입/범죄/액션">잠입/범죄/액션</option>
            <option value="조난">조난</option>
            <option value="조선므훗병맛">조선므훗병맛</option>
            <option value="찌질로맨스">찌질로맨스</option>
            <option value="참교육">참교육</option>
            <option value="추리">추리</option>
            <option value="추리 미스터리">추리 미스터리</option>
            <option value="추리 스릴러">추리 스릴러</option>
            <option value="추리,스릴러">추리,스릴러</option>
            <option value="추리/스릴러">추리/스릴러</option>
            <option value="추적 사냥">추적 사냥</option>
            <option value="코믹">코믹</option>
            <option value="코믹 감성">코믹 감성</option>
            <option value="코믹 액션">코믹 액션</option>
            <option value="코믹 퍼즐">코믹 퍼즐</option>
            <option value="코믹,도둑질 ">코믹,도둑질 </option>
            <option value="코믹/협력/전쟁">코믹/협력/전쟁</option>
            <option value="코믹판타지">코믹판타지</option>
            <option value="탈출 잠입">탈출 잠입</option>
            <option value="판타지">판타지</option>
            <option value="판타지 드라마">판타지 드라마</option>
            <option value="힐링/판타지">힐링/판타지</option>
          </select>
          {genre || '전체'}
        </FilterItem>
        <FilterItem>
          <img
            style={{ marginRight: '5px' }}
            src={iconLocation}
            alt="location"
            width="24px"
            height="24px"
          />
          <select
            name="areaB"
            defaultValue={areaB}
            onChange={e => setAreaB(e.target.value)}
          >
            <option value="">전체</option>
            <option value="강남">강남</option>
            <option value="건대">건대</option>
            <option value="김포">김포</option>
            <option value="노량진">노량진</option>
            <option value="노원">노원</option>
            <option value="대학로">대학로</option>
            <option value="명동">명동</option>
            <option value="서울대입구">서울대입구</option>
            <option value="성신여대">성신여대</option>
            <option value="신림">신림</option>
            <option value="신사">신사</option>
            <option value="신촌">신촌</option>
            <option value="영등포">영등포</option>
            <option value="왕십리">왕십리</option>
            <option value="이수">이수</option>
            <option value="잠실">잠실</option>
            <option value="종각">종각</option>
            <option value="홍대">홍대</option>
          </select>
          {areaB || '전체'}
        </FilterItem>
        <FilterItem>
          <img
            style={{ marginRight: '5px' }}
            src={iconLock}
            alt="level"
            width="24px"
            height="24px"
          />
          <select
            name="level"
            defaultValue={level}
            onChange={e => setLevel(e.target.value)}
          >
            <option value="">전체</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {level || '전체'}
        </FilterItem>
      </Filters>

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
    </>
  );
};

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -12px;
  padding: 12px 20px;
`;
const FilterItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid rgb(var(--border));
  padding: 12px 10px;
  height: 48px;
  font-size: 16px;
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
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const Items = styled.ul``;
const Item = styled.li``;

export default ThemeListPage;
