import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import iconChevronDown from 'assets/icons/chevron-down.svg';

interface IProps extends HTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  value: string;
  prefixIcon?: React.ReactNode;
  children: React.ReactNode;
}
const Select: React.FC<IProps> = ({
  placeholder,
  value,
  prefixIcon,
  children,
  ...props
}) => {
  return (
    <Container isIcon={Boolean(prefixIcon)}>
      {prefixIcon && <PrefixIcon>{prefixIcon}</PrefixIcon>}
      <select {...props}>{children}</select>
      {Boolean(placeholder) && !value ? (
        <Placeholder>{placeholder}</Placeholder>
      ) : (
        value || '전체'
      )}
    </Container>
  );
};

const Container = styled.div<{ isIcon: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  height: 56px;
  background-color: rgb(var(--background));
  font-size: 14px;
  font-weight: 500;
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
  ::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px 16px;
    width: 16px;
    height: 16px;
    background-image: url(${iconChevronDown});
    background-size: 16px 16px;
  }
  ${p =>
    p.isIcon &&
    css`
      padding-left: 52px;
    `}
`;
const PrefixIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 12px 18px 20px;
`;
const Placeholder = styled.span`
  color: rgb(var(--greyscale400));
`;

export default Select;
