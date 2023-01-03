import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

import iconChevronDown from 'assets/icons/chevron-down.svg';

interface IProps extends HTMLAttributes<HTMLSelectElement> {
  value: string;
  children: React.ReactNode;
}
const Select: React.FC<IProps> = ({ value, children, ...props }) => {
  return (
    <Container>
      <select {...props}>{children}</select>
      {value || '전체'}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  height: 56px;
  background-color: rgb(var(--greyscale50));
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
`;
export default Select;
