import React from 'react';
import styled from '@emotion/styled';

import iconCheck from 'assets/icons/check.svg';

export interface IProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
const Checkbox: React.FC<IProps> = ({
  name,
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <Label>
      <Input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Box />
    </Label>
  );
};

const Label = styled.label`
  position: relative;
  vertical-align: middle;
  display: inline-block;
  margin: 0;
  padding: 0;
  line-height: 24px;
`;
const Input = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  border: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  opacity: 0;
`;
const Box = styled.span`
  margin: 0;
  margin-left: 34px;
  line-height: 24px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    cursor: pointer;
    overflow: hidden;
    content: '';
    transition: all 250ms;
  }

  input:not(:checked) + & {
    color: rgb(var(--text));
  }

  // disabled check & background
  input:disabled + &::before,
  input:disabled + &::after {
    cursor: not-allowed;
  }

  // check
  &::before {
    top: 0;
    left: 0;
    margin: 2px;
    width: 20px;
    height: 20px;
    z-index: 1;

    // checked
    input:checked + & {
      background-image: url(${iconCheck});
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }

    // not checked
    input:not(:checked) + & {
      background-color: none;
    }

    // disabled
    input:disabled + & {
      filter: brightness(0.7);
    }
  }

  // background
  &::after {
    top: 0;
    left: 0;
    display: inline-block;
    margin: 0;
    border-radius: 50%;
    width: 24px;
    height: 24px;

    // checked
    input:checked + & {
      border: 1px solid rgb(var(--primary));
    }

    // not checked
    input:not(:checked) + & {
      border: 1px solid rgb(var(--greyscale300));
      background-color: rgb(var(--content));
    }

    // disabled
    input:not(:checked):disabled + & {
      border: 1px solid rgba(31, 31, 32, 0.2);
    }
    input:checked:disabled + & {
      border: 1px solid transparent;
    }
    input:disabled + & {
      background-color: rgba(31, 31, 32, 0.1);
    }
  }
`;

export default Checkbox;
