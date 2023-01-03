import Link from 'next/link';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { Box } from 'components/atoms';
import iconLock from 'assets/icons/lock.svg';

interface IProps {
  theme: ITheme;
}
const ThemeBigCard: React.FC<IProps> = ({ theme }) => {
  return (
    <Link href={`/themes/${theme.id}`} passHref>
      <Container
        imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
      >
        <Contents>
          <Box>
            <Name>{theme.name}</Name>
            {theme.cafe && <Cafe>{theme.cafe.name}</Cafe>}
            <LevelBox>
              {Array.from({ length: theme.level }, (_, i) => (
                <img
                  key={i}
                  src={iconLock}
                  alt="level"
                  width="16px"
                  height="16px"
                />
              ))}
            </LevelBox>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <GenreBox>
              {theme.genre.length > 0 &&
                theme.genre
                  .slice(0, 3)
                  .map(v => <Genre key={v.id}>#{v.id}</Genre>)}
              {theme.genre.length > 3 && '...'}
            </GenreBox>
            <Price>₩{numberWithComma(theme.price)}</Price>
          </Box>
        </Contents>
      </Container>
    </Link>
  );
};

const Container = styled.a<{ imageUrl: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  width: 250px;
  height: 290px;
  background-image: url(${p => p.imageUrl});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
`;
const Contents = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin: 12px;
  border-radius: 16px;
  padding: 12px;
  background-color: rgb(var(--content));
  box-shadow: 4px 8px 16px rgba(17, 24, 39, 0.2);
`;
const Name = styled.strong`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const Cafe = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--greyscale400));
`;
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -1px;
`;
const GenreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: rgb(var(--primary));
  line-height: 18px;
`;
const Genre = styled.span`
  margin-right: 4px;
`;
const Price = styled.span`
  border-radius: 8px;
  padding: 7px 8px;
  background-color: rgb(var(--primary100));
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--primary));
`;

export default ThemeBigCard;
