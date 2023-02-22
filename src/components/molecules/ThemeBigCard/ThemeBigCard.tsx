import Link from 'next/link';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { useAppSelector } from 'store';
import { Box, Stars } from 'components/atoms';
import iconLock from 'assets/icons/lock.svg';
import iconLockDark from 'assets/icons/lock-dark.svg';

interface IProps {
  theme: ITheme;
}
const ThemeBigCard: React.FC<IProps> = ({ theme }) => {
  const colorTheme = useAppSelector(state => state.common.theme ?? 'light');

  return (
    <Link href={`/themes/${theme.id}`} passHref>
      <Container
        imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
      >
        <Contents>
          <Box>
            <Name>{theme.displayName}</Name>
            {theme.cafe && <Cafe>{theme.cafe.name}</Cafe>}
            <Rating>
              <Stars rating={theme?.reviewsRating} />
              <span>
                {theme?.reviewsRating}점({theme?.reviewsCount})
              </span>
            </Rating>
            <LevelBox>
              {Array.from({ length: theme.level }, (_, i) => (
                <img
                  key={i}
                  src={colorTheme === 'light' ? iconLock : iconLockDark}
                  alt="level"
                  width="16px"
                  height="16px"
                />
              ))}
              {theme.during && ` | ${theme.during}분`}
            </LevelBox>
            {theme.genre && (
              <GenreBox>
                {theme.genre.length > 0 &&
                  theme.genre
                    .slice(0, 2)
                    .map(v => <Genre key={v.id}>#{v.id}</Genre>)}
                {theme.genre.length > 2 && '...'}
              </GenreBox>
            )}
          </Box>
        </Contents>

        <Price>₩{numberWithComma(theme.price)}</Price>
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
  background-size: cover;
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
  height: 118px;
  background-color: rgb(var(--content));
  box-shadow: 4px 8px 16px rgba(var(--text), 0.2);
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
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--greyscale400));
`;
const Rating = styled.span`
  margin-left: -1px;
  font-size: 10px;
  > span:last-of-type {
    margin-left: 4px;
  }
`;
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -1px;
  font-size: 10px;
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
  white-space: nowrap;
`;
const Price = styled.span`
  position: absolute;
  bottom: 24px;
  right: 24px;
  border-radius: 8px;
  padding: 7px 8px;
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--primary));
  body[data-theme='light'] & {
    background-color: rgb(var(--primary100));
  }
  body[data-theme='dark'] & {
    background-color: rgb(var(--greyscale700));
  }
`;

export default ThemeBigCard;
