import Link from 'next/link';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import CafeMiniCard from 'components/molecules/CafeMiniCard';
import { Box } from 'components/atoms';
import iconGhost from 'assets/icons/ghost.svg';
import iconActivity from 'assets/icons/activity.svg';
import iconLockBlack from 'assets/icons/lock-black.svg';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ theme }) => {
  return (
    <Wrapper>
      <ThumbnailBox>
        {theme && (
          <Thumbnail
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
            alt={theme?.name}
          />
        )}

        <SubProperties>
          {theme && theme.fear !== 0 && (
            <SubProperty>
              <img src={iconGhost} alt="공포도" width="26px" height="26px" />
              {theme.fear > 4 ? '높음' : theme.fear > 2 ? '중간' : '낮음'}
            </SubProperty>
          )}
          {theme && theme.activity !== 0 && (
            <SubProperty>
              <img src={iconActivity} alt="활동" width="26px" height="26px" />
              {theme.activity > 4
                ? '높음'
                : theme.activity > 2
                ? '중간'
                : '낮음'}
            </SubProperty>
          )}
          {theme && theme.lockingRatio !== 0 && (
            <SubProperty>
              <img
                src={iconLockBlack}
                alt="자물쇠 잠금장치 비율"
                width="24px"
                height="24px"
              />
              {theme.lockingRatio}%
            </SubProperty>
          )}
        </SubProperties>
      </ThumbnailBox>

      <ThemeName>{theme?.name}</ThemeName>

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
            theme.genre.slice(0, 3).map(v => (
              <Link key={v.id} href={`/explore/genre/${v.id}`} passHref>
                <Genre>#{v.id}</Genre>
              </Link>
            ))}
          {theme.genre.length > 3 && '...'}
        </GenreBox>
      )}
      <Intro>{theme?.intro}</Intro>

      <Box mb="18px">
        <SubTitle>카페</SubTitle>
        {theme?.cafe && <CafeMiniCard cafe={theme?.cafe} />}
      </Box>

      <Footer>
        <PriceBox>
          <Price>₩{numberWithComma(theme?.price)}</Price>
          <PriceHelper>※ 2인 플레이 기준 1인 가격</PriceHelper>
        </PriceBox>
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
  display: flex;
  flex-direction: column;
`;
const ThumbnailBox = styled.div`
  position: relative;
  margin-bottom: 18px;
  padding-top: 125%;
`;
const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;
const SubProperties = styled.ul`
  position: absolute;
  bottom: 10px;
  right: 10px;
  > li {
    margin-top: 6px;
    :first-of-type {
      margin-top: 0;
    }
  }
`;
const SubProperty = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 38px;
  width: 38px;
  height: 68px;
  background-color: rgba(240, 240, 240, 0.95);
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 0 40px rgba(17, 24, 39, 0.26);
  > img {
    margin-bottom: 6px;
  }
`;
const ThemeName = styled.h1`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
`;
const Properties = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
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
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(var(--primary));
  line-height: 20px;
`;
const Genre = styled.a`
  margin-right: 4px;
  color: rgb(var(--primary));
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
  bottom: env(safe-area-inset-bottom);
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
  min-height: calc(72px + env(safe-area-inset-bottom));
  background-color: rgb(var(--content));
  z-index: 999;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 18px;
  width: calc(50% - 9px);
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
  width: calc(50% - 9px);
  height: 56px;
  background-color: rgb(var(--primary));
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export default ThemeDetail;
