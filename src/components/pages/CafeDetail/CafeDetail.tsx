import styled from '@emotion/styled';

import { ICafe } from 'types';

interface IProps {
  id: string;
  cafe?: ICafe;
}
const CafeDetail: React.FC<IProps> = ({ id, cafe }) => {
  return (
    <Wrapper>
      <div>카페명: {cafe?.name}</div>
      <div>지역 대분류: {cafe?.areaA}</div>
      <div>지역 소분류: {cafe?.areaB}</div>
      <div>주소: {cafe?.addressLine}</div>
      <div>
        위도/경도: {cafe?.lat}/{cafe?.lng}
      </div>
      <div>웹사이트: {cafe?.website}</div>
      <div>전화번호: {cafe?.tel}</div>
      <div>오픈시간: {cafe?.openingHour}</div>
      <div>클로즈시간: {cafe?.closingHour}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

export default CafeDetail;
