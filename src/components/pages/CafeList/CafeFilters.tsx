import React from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from 'store';
import { Box, SortMiniSelect, MiniSelect } from 'components/atoms';

const ThemeFilters = () => {
  const router = useRouter();
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const areaA = String(router.query.areaA ?? '');
  const areaB = String(router.query.areaB ?? '');

  const location = useAppSelector(state => state.data.location);
  const areaAData = Object.keys(location);
  const areaBData = areaAData.length > 0 ? location[areaA] : [];

  function handleChagneSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const [selectSort, selectOrder] = e.target.value.split('-');
    const query = { ...router.query, sort: selectSort, order: selectOrder };
    router.replace({ query });
  }

  function handleChangeValue(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    const query = { ...router.query };

    if (name === 'areaA' && areaB) {
      delete query['areaB'];
    }

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
        </SortMiniSelect>
      </Box>

      <Box mr="12px">
        <MiniSelect
          name="areaA"
          label="지역"
          value={areaA}
          onChange={handleChangeValue}
        >
          <option value="">전국</option>
          {areaAData?.map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </MiniSelect>
      </Box>

      {areaA && areaBData.length > 0 && (
        <Box>
          <MiniSelect
            name="areaB"
            label="세부지역"
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
      )}

      <Box width="24px" />
    </>
  );
};

export default ThemeFilters;
