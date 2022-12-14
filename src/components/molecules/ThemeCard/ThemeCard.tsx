import Link from 'next/link';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { Box } from 'components/atoms';
import iconMovie from 'assets/icons/movie.svg';
import iconTime from 'assets/icons/time.svg';
import iconLightbulb from 'assets/icons/lightbulb.svg';
import iconSensor from 'assets/icons/sensor.svg';

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
          <Box flexDirection="row" alignItems="center" mb="5px">
            <GenreBox>
              <img src={iconMovie} alt="genre" width="24px" height="24px" />
              {theme.genre.length > 0
                ? theme.genre.map(v => v.id).join(', ')
                : '-'}
            </GenreBox>
            <DuringBox>
              <img src={iconTime} alt="during" width="24px" height="24px" />
              {theme.during}분
            </DuringBox>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <LevelBox>
              <img src={iconLightbulb} alt="level" width="24px" height="24px" />
              난이도 {theme.level}
            </LevelBox>
            <LockingRatioBox>
              <img
                src={iconSensor}
                alt="lockingRatio"
                width="24px"
                height="24px"
              />
              장치 {theme.lockingRatio}%
            </LockingRatioBox>
          </Box>
        </Contents>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(var(--border));
  padding: 12px 32px;
  width: 100%;
`;
const Thumbnail = styled.img`
  border-radius: 4px;
  width: 105px;
  height: 147px;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 10px;
`;
const Name = styled.strong`
  margin-bottom: 5px;
  font-size: 18px;
`;
const Cafe = styled.span`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 300;
  color: #333333;
`;
const GenreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 7px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 300;
  > img {
    margin-right: 2px;
  }
`;
const DuringBox = styled(GenreBox)``;
const LevelBox = styled(GenreBox)``;
const LockingRatioBox = styled(GenreBox)``;

export default ThemeCard;
