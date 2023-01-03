import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import useElementSize from 'hooks/useElementSize';
import BottomSheet from 'components/templates/BottomSheet';
import { Box, Select, Slider } from 'components/atoms';
import iconMinus from 'assets/icons/minus.svg';
import iconPlus from 'assets/icons/plus.svg';
import iconCheck from 'assets/icons/check.svg';
import iconUnCheck from 'assets/icons/uncheck.svg';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ThemeFilter: React.FC<IProps> = ({ isOpen, onClose }) => {
  const [elRef, { width }] = useElementSize();

  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');
  const level = String(router.query.level ?? '');
  const person = Number(router.query.person ?? 0);
  const minPrice = Number(router.query.minPrice ?? 0);
  const maxPrice = Number(router.query.maxPrice ?? 100000);
  const fearScore = String(router.query.fearScore ?? '');
  const activity = String(router.query.activity ?? '');
  const minLockingRatio = Number(router.query.minLockingRatio ?? 0);
  const maxLockingRatio = Number(router.query.maxLockingRatio ?? 100);

  const [_areaB, _setAreaB] = useState(areaB);
  const [_level, _setLevel] = useState(level);
  const [_person, _setPerson] = useState(person);
  const [_minPrice, _setMinPrice] = useState(minPrice);
  const [_maxPrice, _setMaxPrice] = useState(maxPrice);
  const [_fearScore, _setFearScore] = useState(fearScore);
  const [_activity, _setActivity] = useState(activity);
  const [_minLockingRatio, _setMinLockingRatio] = useState(minLockingRatio);
  const [_maxLockingRatio, _setMaxLockingRatio] = useState(maxLockingRatio);

  useEffect(() => {
    _setAreaB(areaB);
    _setLevel(level);
    _setPerson(person);
    _setMinPrice(minPrice);
    _setMaxPrice(maxPrice);
    _setFearScore(fearScore);
    _setActivity(activity);
    _setMinLockingRatio(minLockingRatio);
    _setMaxLockingRatio(maxLockingRatio);
  }, [isOpen, router.query]);

  function handleReset() {
    _setAreaB('');
    _setLevel('');
    _setPerson(0);
    _setMinPrice(0);
    _setMaxPrice(100000);
    _setFearScore('');
    _setActivity('');
    _setMinLockingRatio(0);
    _setMaxLockingRatio(100);
  }

  function handleFinish() {
    const query = { ...router.query } as any;

    if (!_areaB) delete query['areaB'];
    else query['areaB'] = _areaB;

    if (!_level) delete query['level'];
    else query['level'] = _level;

    if (!_person) delete query['person'];
    else query['person'] = _person;

    if (_minPrice === 0) delete query['minPrice'];
    else query['minPrice'] = _minPrice;
    if (_maxPrice === 100000) delete query['maxPrice'];
    else query['maxPrice'] = _maxPrice;

    if (!_fearScore) delete query['fearScore'];
    else query['fearScore'] = _fearScore;

    if (!_activity) delete query['activity'];
    else query['activity'] = _activity;

    if (_minLockingRatio === 0) delete query['minLockingRatio'];
    else query['minLockingRatio'] = _minLockingRatio;
    if (_maxLockingRatio === 100) delete query['maxLockingRatio'];
    else query['maxLockingRatio'] = _maxLockingRatio;

    router.replace({ query });
    return onClose();
  }

  function handleChangeFearScore(value: string) {
    if (_fearScore === value) {
      _setFearScore('');
    } else {
      _setFearScore(value);
    }
  }

  function handleChangeActivity(value: string) {
    if (_activity === value) {
      _setActivity('');
    } else {
      _setActivity(value);
    }
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onReset={handleReset}
      onClose={onClose}
      onFinish={handleFinish}
    >
      <div ref={elRef}>
        <Box mb="24px">
          <Title>지역</Title>
          <Select
            value={_areaB}
            onChange={(e: any) => _setAreaB(e.target.value)}
          >
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

        <Box mb="24px">
          <Title>난이도</Title>
          <Select
            value={_level}
            onChange={(e: any) => _setLevel(e.target.value)}
          >
            <option value="">전체</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </Box>

        <Box mb="24px">
          <Title>인원수</Title>
          <CounterBox>
            <CounterDown
              onClick={() => _person > 0 && _setPerson(prev => prev - 1)}
            >
              <img src={iconMinus} alt="minus" width="14px" height="14px" />
            </CounterDown>
            <CounterText>{_person}</CounterText>
            <CounterUp
              onClick={() => _person < 30 && _setPerson(prev => prev + 1)}
            >
              <img src={iconPlus} alt="plus" width="14px" height="14px" />
            </CounterUp>
          </CounterBox>
        </Box>

        <Box mb="24px">
          <Title>가격</Title>
          <Slider
            width={width}
            step={1000}
            min={0}
            max={100000}
            minVal={_minPrice}
            maxVal={_maxPrice}
            setMinVal={_setMinPrice}
            setMaxVal={_setMaxPrice}
            onChange={({ min, max }) => {
              _setMinPrice(min);
              _setMaxPrice(max);
            }}
          />
        </Box>

        <Box mb="24px">
          <Title>공포도</Title>
          <Box flexDirection="row">
            <CheckButton
              active={_fearScore === 'low'}
              onClick={() => handleChangeFearScore('low')}
            >
              낮음
            </CheckButton>
            <CheckButton
              active={_fearScore === 'medium'}
              onClick={() => handleChangeFearScore('medium')}
            >
              보통
            </CheckButton>
            <CheckButton
              active={_fearScore === 'high'}
              onClick={() => handleChangeFearScore('high')}
            >
              높음
            </CheckButton>
          </Box>
        </Box>

        <Box mb="24px">
          <Title>활동성</Title>
          <Box flexDirection="row">
            <CheckButton
              active={_activity === 'low'}
              onClick={() => handleChangeActivity('low')}
            >
              낮음
            </CheckButton>
            <CheckButton
              active={_activity === 'medium'}
              onClick={() => handleChangeActivity('medium')}
            >
              보통
            </CheckButton>
            <CheckButton
              active={_activity === 'high'}
              onClick={() => handleChangeActivity('high')}
            >
              높음
            </CheckButton>
          </Box>
        </Box>

        <Box mb="24px">
          <Title>잠금 장치 비율</Title>
          <Slider
            width={width}
            step={10}
            min={0}
            max={100}
            minVal={_minLockingRatio}
            maxVal={_maxLockingRatio}
            setMinVal={_setMinLockingRatio}
            setMaxVal={_setMaxLockingRatio}
            onChange={({ min, max }) => {
              _setMinLockingRatio(min);
              _setMaxLockingRatio(max);
            }}
          />
        </Box>
      </div>
    </BottomSheet>
  );
};

const Title = styled.strong`
  display: flex;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
`;
const CounterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CounterUp = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 24px;
  height: 24px;
  background-color: rgb(var(--greyscale50));
`;
const CounterDown = styled(CounterUp)``;
const CounterText = styled.span`
  margin: 0 12px;
  font-size: 14px;
  font-weight: 700;
`;
const CheckButton = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  border-radius: 12px;
  border: 1px solid rgb(var(--greyscale100));
  padding: 14px 20px;
  font-size: 14px;
  ::before {
    content: '';
    display: inline-block;
    margin-right: 6px;
    width: 20px;
    height: 20px;
    background-image: url(${iconUnCheck});
    background-size: 20px 20px;
  }
  ${p =>
    p.active &&
    css`
      border-color: rgb(var(--primary));
      color: rgb(var(--primary));
      ::before {
        background-image: url(${iconCheck});
      }
    `}
`;

export default ThemeFilter;
