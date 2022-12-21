import styled from '@emotion/styled';

import { ICafe } from 'types';
import { Box } from 'components/atoms';
import SimpleMap from 'components/molecules/SimpleMap';

interface IProps {
  cafe?: ICafe;
}
const CafeInfo: React.FC<IProps> = ({ cafe }) => {
  return (
    <Wrapper>
      <Intro>{cafe?.intro && cafe?.intro}</Intro>

      <Title>전화번호</Title>
      <Box mb="28px">{cafe?.tel}</Box>

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
`;

export default CafeInfo;
