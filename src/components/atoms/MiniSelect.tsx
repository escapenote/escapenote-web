import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface IProps extends HTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  name: string;
  label: string;
  value: string;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: React.FC<IProps> = ({
  placeholder,
  name,
  label,
  value,
  children,
  onChange,
}) => {
  const active = Boolean(value);

  return (
    <Container active={active}>
      <select name={name} value={value} onChange={onChange}>
        {children}
      </select>
      {Boolean(placeholder) && !value ? (
        <Placeholder>{placeholder}</Placeholder>
      ) : active ? (
        `${label}: ${value}` || '전체'
      ) : (
        label
      )}
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 8px 16px 8px 16px;
  height: 40px;
  background-color: rgb(var(--background));
  font-size: 12px;
  color: rgb(var(--text));
  select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    opacity: 0;
    cursor: pointer;
  }
  ${p =>
    p.active &&
    css`
      background-color: rgb(var(--primary));
      font-weight: 700;
      color: #ffffff;
    `}
`;
const Placeholder = styled.span`
  color: rgb(var(--greyscale400));
`;

export default Select;
