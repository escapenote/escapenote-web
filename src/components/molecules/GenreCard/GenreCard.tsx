import styled from '@emotion/styled';
import Link from 'next/link';

import React from 'react';
import { IGenre } from 'types';

interface IProps {
  genre: IGenre;
}
const GenreCard: React.FC<IProps> = ({ genre }) => {
  return (
    <Link href={`/explore/genre/${genre.id}`} passHref>
      <Container>
        <Circle>#</Circle>
        <Contents>
          <Name>{genre.id}</Name>
          <Themes>테마 {genre.themes.length}개</Themes>
        </Contents>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 20px;
  border: 1px solid rgb(var(--border));
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.strong`
  font-weight: 500;
`;
const Themes = styled.span`
  font-size: 12px;
  color: rgb(var(--grey));
`;

export default GenreCard;
