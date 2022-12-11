import Link from 'next/link';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { Box } from 'components/atoms';
import iconLock from 'assets/icons/lock.svg';
import iconTime from 'assets/icons/time.svg';
import iconMovie from 'assets/icons/movie.svg';

interface IProps {
  theme: ITheme;
}
const ThemeCard: React.FC<IProps> = ({ theme }) => {
  return (
    <Link href={`/themes/${theme.id}`} passHref>
      <Container>
        <Thumbnail
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
          alt={theme.name}
        />
        <Contents>
          <Name>{theme.name}</Name>
          <Cafe>{theme.cafe.name}</Cafe>
          <Box flexDirection="row" alignItems="center" mb="10px">
            <LevelBox>
              {Array.from({ length: theme.level }, (_, i) => (
                <img
                  key={i}
                  src={iconLock}
                  alt="lock"
                  width="24px"
                  height="24px"
                />
              ))}
            </LevelBox>
            <DuringBox>
              <img src={iconTime} alt="time" width="24px" height="24px" />
              {theme.during}분
            </DuringBox>
          </Box>
          {/* <div>{theme.lockingRatio}</div> */}
          <GenreBox>
            <img src={iconMovie} alt="genre" width="24px" height="24px" />
            {theme.genre || '미정'}
          </GenreBox>
        </Contents>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(var(--border));
  padding: 12px 20px;
  width: 100%;
`;
const Thumbnail = styled.img`
  border: 1px solid rgb(var(--border));
  width: 150px;
  height: 150px;
`;
const Contents = styled.div`
  flex: 1;
  padding: 10px;
`;
const Name = styled.strong`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 700;
`;
const Cafe = styled.span`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333333;
`;
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;
`;
const DuringBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  > img {
    margin-right: 6px;
  }
`;
const GenreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  > img {
    margin-right: 6px;
  }
`;

export default ThemeCard;
