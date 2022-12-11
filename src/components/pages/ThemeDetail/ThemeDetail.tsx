import styled from '@emotion/styled';

import { ITheme } from 'types';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ id, theme }) => {
  return (
    <Wrapper>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme?.thumbnail}`}
        alt={theme?.name}
        width="100%"
        height="auto"
      />
      <div>테마명: {theme?.name}</div>
      <div>소개: {theme?.intro}</div>
      <div>장르: {theme?.genre}</div>
      <div>금액: {theme?.price}</div>
      <div>시간: {theme?.during}</div>
      <div>
        인원수: {theme?.minPerson} ~ {theme?.maxPerson}
      </div>
      <div>난이도: {theme?.level}</div>
      <div>자물쇠 장치 비율: {theme?.lockingRatio}</div>
      <div>오픈일: {theme?.openDate}</div>
      <div>상세 페이지: {theme?.detailUrl}</div>
      <div>예약 페이지: {theme?.reservationUrl}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

export default ThemeDetail;
