import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import api from 'api';
import FetchMore from 'components/templates/FetchMore';
import ThemeCard from 'components/molecules/ThemeCard';
import { Box } from 'components/atoms';
import iconFilter from 'assets/icons/filter.svg';
import iconMovie from 'assets/icons/movie.svg';
import iconLocation from 'assets/icons/location.svg';
import iconLightbulb from 'assets/icons/lightbulb.svg';
import iconSensor from 'assets/icons/sensor.svg';

const ThemeListPage = () => {
  const [genre, setGenre] = useState('');
  const [areaB, setAreaB] = useState('');
  const [level, setLevel] = useState('');
  const [lockingRatio, setLockingRatio] = useState('');

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['fetchThemes', genre, areaB, level, lockingRatio],
    ({ pageParam }) => {
      return api.themes.fetchThemes({
        genre,
        areaB,
        level,
        lockingRatio,
        cursor: pageParam,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
    },
  );

  const { data: genreList } = useQuery(['fetchGenreList'], () => {
    return api.genre.fetchGenreList();
  });

  return (
    <>
      <Filters>
        <Box flexDirection="row">
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
              {genreList?.map(v => (
                <option key={v.id} value={v.id}>
                  {v.id}
                </option>
              ))}
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
              src={iconLightbulb}
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
          <FilterItem>
            <img
              style={{ marginRight: '5px' }}
              src={iconSensor}
              alt="lockingRatio"
              width="24px"
              height="24px"
            />
            <select
              name="lockingRatio"
              defaultValue={level}
              onChange={e => setLockingRatio(e.target.value)}
            >
              <option value="">전체</option>
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </select>
            {lockingRatio ? `${lockingRatio}%` : '전체'}
          </FilterItem>
        </Box>
        {/* <FilterItem shadow>
          <img src={iconFilter} alt="filter" width="24px" height="24px" />
        </FilterItem> */}
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
  justify-content: space-between;
  margin-bottom: -12px;
  padding: 12px 20px;
`;
const FilterItem = styled.div<{ shadow?: boolean }>`
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
  :last-child {
    margin-right: 0;
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
  ${p =>
    p.shadow &&
    css`
      box-shadow: 2px 2px 2px rgb(var(--border));
    `};
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
