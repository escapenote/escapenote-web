import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { useAppDispatch } from 'store';
import { setReviewTypeAndId } from 'store/reviewSlice';
import CafeMiniCard from 'components/molecules/CafeMiniCard';
import { Box, Stars, Text } from 'components/atoms';
import ThemeReviews from './ThemeReviews';
import iconGhost from 'assets/icons/ghost.svg';
import iconActivity from 'assets/icons/activity.svg';
import iconLockBlack from 'assets/icons/lock-black.svg';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ id, theme }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getRatingText = (rating: number) => {
    if (rating > 3.9) return '꽃길';
    else if (rating > 1.9) return '풀길';
    else if (rating > 0) return '흙길';
    else return '리뷰쓰길';
  };

  function handleWriteReview() {
    dispatch(setReviewTypeAndId({ type: 'theme', id }));
    router.push('/create/review');
  }

  const reviewsCount = theme?.reviewsCount ?? 0;

  return (
    <Wrapper>
      <Container>
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
                {theme.fear > 3 ? '높음' : theme.fear > 2 ? '보통' : '낮음'}
              </SubProperty>
            )}
            {theme && theme.activity !== 0 && (
              <SubProperty>
                <img src={iconActivity} alt="활동" width="22px" height="22px" />
                {theme.activity > 3
                  ? '높음'
                  : theme.activity > 2
                  ? '보통'
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
          <Box width="1px" height="20px" backgroundColor="rgb(var(--border))" />
          <Property>
            <span>시간</span>
            <strong>{theme?.during}분</strong>
          </Property>
          <Box width="1px" height="20px" backgroundColor="rgb(var(--border))" />
          <Property>
            <span>인원수</span>
            <strong>
              {theme?.minPerson}-{theme?.maxPerson}
            </strong>
          </Property>
        </Properties>
      </Container>

      <Container>
        <Box mb="14px">
          <SubTitle>시놉시스</SubTitle>
        </Box>
        {theme && (
          <GenreBox>
            {theme.genre.length > 0 &&
              theme.genre.map(v => (
                <Link key={v.id} href={`/explore/genre/${v.id}`} passHref>
                  <Genre>#{v.id}</Genre>
                </Link>
              ))}
          </GenreBox>
        )}
        <Intro>{theme?.intro}</Intro>
      </Container>

      <Container>
        <Box mb="14px">
          <SubTitle>카페</SubTitle>
        </Box>
        {theme?.cafe && <CafeMiniCard cafe={theme?.cafe} />}
      </Container>

      <Container>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb="14px"
        >
          <Box flexDirection="row" alignItems="center">
            <SubTitle>리뷰</SubTitle>
            <Box width="6px" />
            <Text
              fontSize="16px"
              fontWeight="700"
              color={
                reviewsCount === 0
                  ? 'rgb(var(--greyscale500))'
                  : 'rgb(var(--primary))'
              }
            >
              {reviewsCount}
            </Text>
          </Box>
          {reviewsCount > 0 && (
            <WriteReviewButton onClick={handleWriteReview}>
              리뷰쓰기
            </WriteReviewButton>
          )}
        </Box>

        <ReviewDashboard>
          <RatingBox>
            <RatingLeftBox>
              <Text
                fontSize="32px"
                fontWeight="700"
                color={
                  reviewsCount === 0
                    ? 'rgb(var(--greyscale500))'
                    : 'rgb(var(--text))'
                }
              >
                {getRatingText(theme?.reviewsRating ?? 0)}
              </Text>
              <Stars size="19px" rating={theme?.reviewsRating} />
            </RatingLeftBox>
            <RatingRightBox>
              <div>
                <Text fontSize="12px">체감난이도</Text>
                <Stars size="14px" rating={theme?.reviewsLevel} />
              </div>
              <div>
                <Text fontSize="12px">공포도</Text>
                <Stars size="14px" rating={theme?.reviewsFear} />
              </div>
              <div>
                <Text fontSize="12px">활동성</Text>
                <Stars size="14px" rating={theme?.reviewsActivity} />
              </div>
            </RatingRightBox>
          </RatingBox>
          <ReviewDesc>
            ※ 악의적 내용과 스포일러 등이 포함된 글은 삭제될 수 있습니다.
          </ReviewDesc>
        </ReviewDashboard>

        <ThemeReviews themeId={id} reviewsCount={reviewsCount} />
      </Container>

      <Footer>
        <FooterContainer>
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
        </FooterContainer>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: -24px;
  margin-bottom: 48px;
`;
const Container = styled.div`
  padding: 14px 24px;
  border-bottom: 10px solid rgb(var(--greyscale50));
`;
const SubTitle = styled.strong`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const ThumbnailBox = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 18px;
  padding-top: 125%;
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      326.9deg,
      #000000 -27.6%,
      rgba(217, 217, 217, 0) 48.76%
    );
  }
`;
const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
  width: 100%;
  height: 100%;
`;
const SubProperties = styled.ul`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
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
  background-color: rgba(var(--greyscale100), 0.95);
  font-size: 12px;
  font-weight: 500;
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
  align-items: center;
  margin-bottom: 14px;
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
  margin-bottom: 4px;
  font-size: 14px;
  color: rgb(var(--primary));
  line-height: 20px;
`;
const Genre = styled.a`
  margin-right: 4px;
  color: rgb(var(--primary));
`;
const Intro = styled.p`
  color: rgb(var(--greyscale400));
  white-space: pre-line;
`;
const ReviewDashboard = styled.div`
  border-bottom: 1px solid rgb(var(--greyscale100));
`;
const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 24px 16px;
  height: 108px;
  background-color: rgb(var(--greyscale50));
`;
const RatingLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.9;
  border-right: 1px solid rgb(var(--greyscale400));
  padding-right: 16px;
`;
const RatingRightBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.1;
  padding-left: 16px;
  > div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 2px 0;
  }
  span:first-of-type {
    margin-right: 8px;
  }
`;
const ReviewDesc = styled.p`
  margin-bottom: 12px;
  font-size: 12px;
  text-align: center;
`;
const WriteReviewButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--primary));
`;
const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgb(var(--border));
  height: 72px;
  min-height: calc(72px + env(safe-area-inset-bottom));
  background-color: rgb(var(--content));
  z-index: 999;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
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
