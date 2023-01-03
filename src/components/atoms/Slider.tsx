import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface IProps {
  width: number;
  step: number;
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  setMinVal: any;
  setMaxVal: any;
  onChange: (data: { min: number; max: number }) => void;
}
const MultiRangeSlider: React.FC<IProps> = ({
  width,
  step,
  min,
  max,
  minVal,
  maxVal,
  setMinVal,
  setMaxVal,
  onChange,
}) => {
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <Container width={width}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={step}
        onChange={event => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
        }}
        className="thumb thumb--left"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={step}
        onChange={event => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal.toLocaleString()}</div>
        <div className="slider__right-value">{maxVal.toLocaleString()}</div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;

  .slider {
    position: relative;
    width: ${p => p.width}px;
  }

  .slider__track,
  .slider__range,
  .slider__left-value,
  .slider__right-value {
    position: absolute;
  }

  .slider__track,
  .slider__range {
    border-radius: 3px;
    height: 5px;
  }

  .slider__track {
    background-color: #e5e7eb;
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: #ff8142;
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    /* color: #dee2e6; */
    font-size: 12px;
    font-weight: 500;
    margin-top: 20px;
  }

  .slider__left-value {
    left: 6px;
  }

  .slider__right-value {
    right: -4px;
  }

  /* Removing the default appearance */
  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: ${p => p.width}px;
    outline: none;
  }

  .thumb--left {
    z-index: 3;
  }

  .thumb--right {
    z-index: 4;
  }

  /* For Chrome browsers */
  .thumb::-webkit-slider-thumb {
    background-color: #f9fafb;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  /* For Firefox browsers */
  .thumb::-moz-range-thumb {
    background-color: #f9fafb;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

export default MultiRangeSlider;
