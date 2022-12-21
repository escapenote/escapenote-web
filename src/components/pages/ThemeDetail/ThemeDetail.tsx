import styled from '@emotion/styled';

import { ITheme } from 'types';
import { Box } from 'components/atoms';
import CafeMiniCard from 'components/molecules/CafeMiniCard';
import { numberWithComma } from 'utils/common';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ id, theme }) => {
  return (
    <Wrapper>
      <Thumbnail
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme?.thumbnail}`}
        alt={theme?.name}
      />

      <ThemeName>{theme?.name}</ThemeName>
      <CafeName>{theme?.cafe.name}</CafeName>

      <Properties>
        <Property>
          <span>난이도</span>
          <strong>{theme?.level}</strong>
        </Property>
        <Property>
          <span>시간</span>
          <strong>{theme?.during}분</strong>
        </Property>
        <Property>
          <span>인원수</span>
          <strong>
            {theme?.minPerson}-{theme?.maxPerson}
          </strong>
        </Property>
      </Properties>

      {theme && (
        <GenreBox>
          {theme.genre.length > 0 &&
            theme.genre.slice(0, 3).map(v => <Genre key={v.id}>#{v.id}</Genre>)}
          {theme.genre.length > 3 && '...'}
        </GenreBox>
      )}
      <Intro>{theme?.intro}</Intro>

      <Box mb="18px">
        <SubTitle>카페</SubTitle>
        {theme?.cafe && <CafeMiniCard cafe={theme?.cafe} />}
      </Box>

      <Footer>
        <Box>
          <Price>₩{numberWithComma(theme?.price)}</Price>
          <PriceHelper>※ 2인 플레이 기준 1인 가격</PriceHelper>
        </Box>
        <ReservationLink
          href={theme?.reservationUrl}
          target="_blank"
          rel="noreferrer"
        >
          예약하기
        </ReservationLink>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const Thumbnail = styled.img`
  margin-bottom: 18px;
  border-radius: 16px;
  aspect-ratio: 0.815 / 1;
`;
const ThemeName = styled.h1`
  margin-bottom: 2px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
`;
const CafeName = styled.strong`
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--greyscale400));
  text-align: center;
`;
const Properties = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-bottom: 18px;
`;
const Property = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    margin-bottom: 2px;
    font-size: 12px;
    color: rgb(var(--greyscale500));
  }
  > strong {
    font-size: 14px;
    font-weight: 700;
  }
`;
const GenreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: rgb(var(--primary));
  line-height: 20px;
`;
const Genre = styled.span`
  margin-right: 4px;
`;
const Intro = styled.p`
  margin-bottom: 28px;
  color: rgb(var(--greyscale400));
  white-space: pre-line;
`;
const SubTitle = styled.strong`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(var(--border));
  padding: 8px 24px;
  width: 100%;
  height: 72px;
  background-color: rgb(var(--content));
  z-index: 999;
`;
const Price = styled.strong`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const PriceHelper = styled.small`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const ReservationLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  width: 148px;
  height: 56px;
  background-color: rgb(var(--primary));
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export default ThemeDetail;
