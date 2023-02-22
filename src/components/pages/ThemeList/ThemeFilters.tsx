import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppSelector } from 'store';
import { Box, SortMiniSelect, MiniSelect } from 'components/atoms';

const ThemeFilters = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const areaB = String(router.query.areaB ?? '');
  const genre = String(router.query.genre ?? '');
  const level = String(router.query.level ?? '');
  const person = String(router.query.person ?? '');

  const location = useAppSelector(state => state.data.location);
  const areaBData = location['서울'];

  const { data: genreList } = useQuery(['fetchGenreList'], () => {
    return api.genre.fetchGenreList();
  });

  function handleChagneSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const [selectSort, selectOrder] = e.target.value.split('-');
    const query = { ...router.query, sort: selectSort, order: selectOrder };
    router.replace({ query });
  }

  function handleChangeValue(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    const query = { ...router.query };
    if (!value) delete query[name];
    else query[name] = value;
    router.replace({ query });
  }

  return (
    <>
      <Box width="24px" />

      <Box mr="12px">
        <SortMiniSelect
          name="sort"
          label="정렬"
          value={`${sort}-${order}`}
          onChange={handleChagneSortOrder}
        >
          <option value="createdAt-desc">업데이트순</option>
          <option value="view-desc">인기순</option>
          <option value="level-desc">난이도 높은순</option>
          <option value="level-asc">난이도 낮은순</option>
          <option value="price-desc">금액 높은순</option>
          <option value="price-asc">금액 낮은순</option>
          <option value="fear-desc">공포도 높은순</option>
          <option value="fear-asc">공포도 낮은순</option>
          <option value="activity-desc">활동성 높은순</option>
          <option value="activity-asc">활동성 낮은순</option>
        </SortMiniSelect>
      </Box>

      <Box mr="12px">
        <MiniSelect
          name="areaB"
          label="지역"
          value={areaB}
          onChange={handleChangeValue}
        >
          <option value="">전체</option>
          {areaBData?.map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </MiniSelect>
      </Box>

      <Box mr="12px">
        <MiniSelect
          name="genre"
          label="장르"
          value={genre}
          onChange={handleChangeValue}
        >
          <option value="">전체</option>
          {genreList?.map(item => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </MiniSelect>
      </Box>

      <Box mr="12px">
        <MiniSelect
          name="level"
          label="난이도"
          defaultValue={level}
          value={level}
          onChange={handleChangeValue}
        >
          <option value="">전체</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </MiniSelect>
      </Box>

      <Box>
        <MiniSelect
          name="person"
          label="인원수"
          defaultValue={person}
          value={person}
          onChange={handleChangeValue}
        >
          <option value="">전체</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </MiniSelect>
      </Box>

      <Box width="24px" />
    </>
  );
};

export default ThemeFilters;
