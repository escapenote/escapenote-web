import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import BottomSheet from 'components/templates/BottomSheet';
import { Box, Select } from 'components/atoms';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const CafeFilter: React.FC<IProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');

  const [_areaB, _setAreaB] = useState(() => areaB);

  useEffect(() => {
    _setAreaB(areaB);
  }, [isOpen, router.query]);

  function handleReset() {
    _setAreaB('');
  }

  function handleFinish() {
    const query = { ...router.query };
    if (!_areaB) delete query['areaB'];
    else query['areaB'] = _areaB;
    router.replace({ query });
    return onClose();
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onReset={handleReset}
      onClose={onClose}
      onFinish={handleFinish}
    >
      <Box mb="24px">
        <Title>지역</Title>
        <Select value={_areaB} onChange={(e: any) => _setAreaB(e.target.value)}>
          <option value="">전체</option>
          <option value="강남">강남</option>
          <option value="건대">건대</option>
          <option value="김포">김포</option>
          <option value="노량진">노량진</option>
          <option value="노원">노원</option>
          <option value="대학로">대학로</option>
          <option value="명동">명동</option>
          <option value="서울대입구">서울대입구</option>
          <option value="성신여대">성신여대</option>
          <option value="신림">신림</option>
          <option value="신사">신사</option>
          <option value="신촌">신촌</option>
          <option value="영등포">영등포</option>
          <option value="왕십리">왕십리</option>
          <option value="이수">이수</option>
          <option value="잠실">잠실</option>
          <option value="종각">종각</option>
          <option value="홍대">홍대</option>
        </Select>
      </Box>
    </BottomSheet>
  );
};

const Title = styled.strong`
  display: flex;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
`;

export default CafeFilter;
