import styled from '@emotion/styled';
import React from 'react';

interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
const Tag: React.FC<IProps> = ({ children, onClick }) => {
  return <StyledTag onClick={onClick}>{children}</StyledTag>;
};

const StyledTag = styled.span`
  margin-right: 8px;
  border-radius: 12px;
  padding: 11px 16px;
  background-color: rgb(var(--greyscale50));
  font-size: 12px;
  cursor: pointer;
`;

export default Tag;
