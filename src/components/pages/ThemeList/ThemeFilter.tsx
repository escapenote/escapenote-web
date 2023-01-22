import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import api from 'api';
import { useAppSelector } from 'store';
import useElementSize from 'hooks/useElementSize';
import BottomSheetFilter from 'components/templates/BottomSheetFilter';
import { Box, Select, Slider } from 'components/atoms';
import iconMinus from 'assets/icons/minus.svg';
import iconPlus from 'assets/icons/plus.svg';
import iconCheck from 'assets/icons/check.svg';
import iconUnCheck from 'assets/icons/uncheck.svg';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ThemeFilter: React.FC<IProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const areaB = String(router.query.areaB ?? '');
  const genre = String(router.query.genre ?? '');
  const level = String(router.query.level ?? '');
  const person = Number(router.query.person ?? 0);
  const fearScore = String(router.query.fearScore ?? '');
  const activity = String(router.query.activity ?? '');
  const lockingRatio = String(router.query.lockingRatio ?? '');

  const location = useAppSelector(state => state.data.location);
  const areaAData = '서울';
  const areaBData = location[areaAData];
  const [elRef, { width }] = useElementSize();

  const [_areaB, _setAreaB] = useState(areaB);
  const [_genre, _setGenre] = useState(genre);
  const [_level, _setLevel] = useState(level);
  const [_person, _setPerson] = useState(person);
  const [_fearScore, _setFearScore] = useState(fearScore);
  const [_activity, _setActivity] = useState(activity);
  const [_lockingRatio, _setLockingRatio] = useState(lockingRatio);

  const { data: genreList } = useQuery(['fetchGenreList'], () => {
    return api.genre.fetchGenreList();
  });

  useEffect(() => {
    _setAreaB(areaB);
    _setGenre(genre);
    _setLevel(level);
    _setPerson(person);
    _setFearScore(fearScore);
    _setActivity(activity);
    _setLockingRatio(lockingRatio);
  }, [isOpen, router.query]);

  function handleReset() {
    _setAreaB('');
    _setGenre('');
    _setLevel('');
    _setPerson(0);
    _setFearScore('');
    _setActivity('');
    _setLockingRatio('');
  }

  function handleFinish() {
    const query = { ...router.query } as any;

    if (!_areaB) delete query['areaB'];
    else query['areaB'] = _areaB;

    if (!_genre) delete query['genre'];
    else query['genre'] = _genre;

    if (!_level) delete query['level'];
    else query['level'] = _level;

    if (!_person) delete query['person'];
    else query['person'] = _person;

    if (!_fearScore) delete query['fearScore'];
    else query['fearScore'] = _fearScore;

    if (!_activity) delete query['activity'];
    else query['activity'] = _activity;

    if (!_lockingRatio) delete query['lockingRatio'];
    else query['lockingRatio'] = _lockingRatio;

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

  function handleChangeLockingRatio(value: string) {
    if (_lockingRatio === value) {
      _setLockingRatio('');
    } else {
      _setLockingRatio(value);
    }
  }

  return (
    <BottomSheetFilter
      isOpen={isOpen}
      onReset={handleReset}
      onClose={onClose}
      onFinish={handleFinish}
    >
      <div ref={elRef}>
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

        <Box mb="24px">
          <Title>장르</Title>
          <Select
            defaultValue={_genre}
            value={_genre}
            onChange={(e: any) => _setGenre(e.target.value)}
          >
            <option value="">전체</option>
            {genreList?.map(item => (
              <option key={item.id} value={item.id}>
                {item.id}
              </option>
            ))}
          </Select>
        </Box>

        <Box mb="24px">
          <Title>난이도</Title>
          <Select
            defaultValue={_level}
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
          <Box flexDirection="row">
            <CheckButton
              active={_lockingRatio === 'low'}
              onClick={() => handleChangeLockingRatio('low')}
            >
              낮음
            </CheckButton>
            <CheckButton
              active={_lockingRatio === 'medium'}
              onClick={() => handleChangeLockingRatio('medium')}
            >
              보통
            </CheckButton>
            <CheckButton
              active={_lockingRatio === 'high'}
              onClick={() => handleChangeLockingRatio('high')}
            >
              높음
            </CheckButton>
          </Box>
        </Box>
      </div>
    </BottomSheetFilter>
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
