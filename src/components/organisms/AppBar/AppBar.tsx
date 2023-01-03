import React from 'react';
import styled from '@emotion/styled';

import { Box } from 'components/atoms';

interface IProps {
  title?: string;
  subTitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  appBar?: React.ReactNode;
}
const Header: React.FC<IProps> = ({
  title,
  subTitle,
  leftAction,
  rightAction,
  appBar,
}) => (
  <StyledHeader>
    {appBar ? (
      appBar
    ) : (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        {leftAction && <Action>{leftAction}</Action>}
        <Box>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
          {title && <Title>{title}</Title>}
        </Box>
        {rightAction && <Action>{rightAction}</Action>}
      </Box>
    )}
  </StyledHeader>
);

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgb(var(--border));
  padding: 8px 24px;
  height: 56px;
  background-color: rgb(var(--content));
  z-index: 999;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;
const SubTitle = styled.small`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const Action = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 48px;
`;

export default Header;
