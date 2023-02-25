import React from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import { useAppSelector } from 'store';
import GenreCard from 'components/molecules/GenreCard';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  term: string;
}
const SearchedGenreList: React.FC<IProps> = ({ term }) => {
  const { isLoading, data, error } = useQuery(['fetchGenreList', term], () => {
    return api.genre.fetchGenreList({ term });
  });

  return (
    <>
      <Ads />

      {isLoading ? (
        <Loading>로딩중...</Loading>
      ) : error ? (
        <Error>에러</Error>
      ) : data?.length === 0 ? (
        <NoData>데이터가 없습니다.</NoData>
      ) : (
        <Items>
          {data?.map(item => (
            <Item key={item.id}>
              <GenreCard genre={item} />
            </Item>
          ))}
        </Items>
      )}
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
          slot={colorTheme === 'light' ? '4408521827' : '4670846903'}
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

export default SearchedGenreList;
