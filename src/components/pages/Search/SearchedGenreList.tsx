import React from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import GenreCard from 'components/molecules/GenreCard';

interface IProps {
  term: string;
}
const SearchedGenreList: React.FC<IProps> = ({ term }) => {
  const { isLoading, data, error } = useQuery(['fetchGenreList', term], () => {
    return api.genre.fetchGenreList({ term });
  });

  return (
    <>
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
