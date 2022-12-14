import styled from '@emotion/styled';

import { ITheme } from 'types';
import { Box } from 'components/atoms';
import iconMovie from 'assets/icons/movie.svg';
import iconTime from 'assets/icons/time.svg';
import iconLightbulb from 'assets/icons/lightbulb.svg';
import iconSensor from 'assets/icons/sensor.svg';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ id, theme }) => {
  return (
    <Wrapper>
      <Box flexDirection="row" alignItems="flex-start" mb="10px">
        <Thumbsnail
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme?.thumbnail}`}
          alt={theme?.name}
        />

        <Box flex="1" ml="12px">
          <CafeBox>
            <CafeLabel>카페</CafeLabel>
            <CafeName>{theme?.cafe.name}</CafeName>
          </CafeBox>

          <Box py="10px">
            <ThemeGenre>
              <img src={iconMovie} alt="genre" width="24px" height="24px" />
              {theme && theme?.genre.length > 0
                ? theme?.genre.map(v => v.id).join(', ')
                : '-'}
            </ThemeGenre>
            <ThemeDuring>
              <img src={iconTime} alt="during" width="24px" height="24px" />
              {theme?.during}분
            </ThemeDuring>
            <ThemeLevel>
              <img src={iconLightbulb} alt="level" width="24px" height="24px" />
              난이도 {theme?.level}
            </ThemeLevel>
            <ThemeLockingRatio>
              <img
                src={iconSensor}
                alt="lockingRatio"
                width="24px"
                height="24px"
              />
              장치 {theme?.lockingRatio}%
            </ThemeLockingRatio>
          </Box>
        </Box>
      </Box>

      <Box>
        <ThemeName>{theme?.name}</ThemeName>
        <ThemeIntro>{theme?.intro}</ThemeIntro>
      </Box>

      <ReservationLink href={theme?.reservationUrl} target="_blank">
        예약하기
      </ReservationLink>

      {/* <div>금액: {theme?.price}</div>
      <div>
        인원수: {theme?.minPerson} ~ {theme?.maxPerson}
      </div>
      <div>오픈일: {theme?.openDate}</div>
      <div>상세 페이지: {theme?.detailUrl}</div>
      <div>예약 페이지: {theme?.reservationUrl}</div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  padding: 10px 20px;
`;
const Thumbsnail = styled.img`
  flex: 1;
  min-width: 176px;
  aspect-ratio: 0.73 / 1;
`;
const CafeBox = styled.div`
  margin-bottom: 10px;
  border: 1px solid rgb(var(--border));
  padding: 10px 10px 32px 10px;
`;
const CafeLabel = styled.label`
  margin-bottom: 5px;
  font-size: 18px;
`;
const CafeName = styled.strong`
  font-size: 16px;
  font-weight: 300;
`;
const ThemeGenre = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  font-weight: 300;
  > img {
    margin-right: 2px;
  }
`;
const ThemeDuring = styled(ThemeGenre)``;
const ThemeLevel = styled(ThemeGenre)``;
const ThemeLockingRatio = styled(ThemeGenre)``;
const ThemeName = styled.h1`
  margin-bottom: 5px;
  font-size: 18px;
  line-height: 25.2px;
`;
const ThemeIntro = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 22.4px;
`;
const ReservationLink = styled.a`
  position: absolute;
  right: 0;
  bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  border: 1px solid rgb(var(--border));
  width: 84px;
  height: 37px;
  box-shadow: 2px 2px 2px rgb(var(--border));
  background-color: rgb(var(--border));
  color: white;
`;

export default ThemeDetail;
