import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useAppSelector } from 'store';
import BottomSheetFilter from 'components/templates/BottomSheetFilter';
import { Box, Select } from 'components/atoms';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const CafeFilter: React.FC<IProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');

  const location = useAppSelector(state => state.data.location);
  const areaAData = '서울';
  const areaBData = location[areaAData];

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
    <BottomSheetFilter
      isOpen={isOpen}
      onReset={handleReset}
      onClose={onClose}
      onFinish={handleFinish}
    >
      <Box mb="24px">
        <Title>지역</Title>
        <Select
          defaultValue={_areaB}
          value={_areaB}
          onChange={(e: any) => _setAreaB(e.target.value)}
        >
          <option value="">전체</option>
          {areaBData?.map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </Box>
    </BottomSheetFilter>
  );
};

const Title = styled.strong`
  display: flex;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
`;

export default CafeFilter;
