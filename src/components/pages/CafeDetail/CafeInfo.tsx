import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { ICafe } from 'types';
import { Box } from 'components/atoms';
import SimpleMap from 'components/molecules/SimpleMap';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  cafe?: ICafe;
}
const CafeInfo: React.FC<IProps> = ({ cafe }) => {
  const introRef = useRef<HTMLParagraphElement>(null);
  const [overHeightIntro, setOverHeightIntro] = useState(false);

  useEffect(() => {
    handleAdjustHeight();
  }, [introRef]);

  function handleAdjustHeight() {
    if (!introRef.current) return;

    const { height } = introRef.current.getBoundingClientRect();
    if (height > 80) {
      introRef.current.style.display = '-webkit-box';
      introRef.current.style.webkitLineClamp = '4';
      introRef.current.style.webkitBoxOrient = 'vertical';
      introRef.current.style.overflow = 'hidden';
      setOverHeightIntro(true);
    }
  }

  function handleMoreIntro() {
    if (!introRef.current) return;
    introRef.current.style.display = 'block';
    introRef.current.style.overflow = 'auto';
    setOverHeightIntro(false);
  }

  return (
    <Wrapper>
      <Box mb="24px">
        <GoogleAdsense style={{ height: '54px' }} slot="6354622686" />
      </Box>

      {cafe?.intro && (
        <Box alignItems="flex-start" mb="28px">
          <Intro ref={introRef}>{cafe?.intro}</Intro>
          {overHeightIntro && (
            <MoreIntro onClick={handleMoreIntro}>더보기</MoreIntro>
          )}
        </Box>
      )}

      <Title>운영시간</Title>
      <Box flexDirection="row" mb="28px">
        <Box flex="0.6">
          {cafe?.openingHours.slice(0, 5).map(v => (
            <div key={v.day}>
              {v.day} {v.openTime} - {v.closeTime}
            </div>
          ))}
        </Box>
        <Box>
          {cafe?.openingHours.slice(5, 7).map(v => (
            <div key={v.day}>
              {v.day} {v.openTime} - {v.closeTime}
            </div>
          ))}
        </Box>
      </Box>

      <Title>위치</Title>
      <Box mb="4px">{cafe?.addressLine}</Box>
      <SimpleMap
        addressLine={cafe?.addressLine}
        lat={cafe?.lat}
        lng={cafe?.lng}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 18px;
  padding-top: 18px;
`;
const Title = styled.h2`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const Intro = styled.p`
  white-space: pre-line;
  line-height: 20px;
`;
const MoreIntro = styled.button`
  color: rgb(var(--primary));
`;

export default CafeInfo;
