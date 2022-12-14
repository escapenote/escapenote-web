import React from 'react';
import styled from '@emotion/styled';

import iconLogo from 'assets/icons/escape-note.svg';

interface IProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}
const Header: React.FC<IProps> = props => (
  <StyledHeader>
    <Action>{props.leftAction}</Action>
    <Title>
      <img src={iconLogo} alt="escpae note" width="132px" height="32px" />
    </Title>
    <Action>{props.rightAction}</Action>
  </StyledHeader>
);

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(var(--border));
  border-bottom: 2px solid rgb(var(--border));
  padding: 16px 16px 0 16px;
  height: 70px;
  background-color: rgb(var(--content));
  z-index: 99;
  ::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 0;
    right: 0;
    display: block;
    border-bottom: 1px solid rgb(var(--border));
    width: 100%;
    height: 5px;
    background-color: rgb(var(--content));
    z-index: 98;
  }
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const Title = styled.h1`
  display: block;
  max-width: 300px;
  img {
    object-fit: contain;
  }
`;
const Action = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 48px;
`;

export default Header;
