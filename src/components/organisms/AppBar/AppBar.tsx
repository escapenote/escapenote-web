import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ITabOption } from 'types';
import { Box } from 'components/atoms';

interface IProps {
  title?: string;
  subTitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  appBar?: React.ReactNode;
  activeTab?: string;
  tabs?: ITabOption[];
}
const Header: React.FC<IProps> = ({
  title,
  subTitle,
  leftAction,
  rightAction,
  appBar,
  activeTab,
  tabs,
}) => (
  <>
    <StyledHeader>
      {appBar ? (
        appBar
      ) : (
        <>
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
        </>
      )}
    </StyledHeader>

    {tabs && (
      <Tabs>
        {tabs.map(tab => (
          <Tab
            key={tab.key}
            role="button"
            active={tab.key === activeTab}
            onClick={tab.onClick}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>
    )}
  </>
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
const Title = styled.strong`
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
  justify-content: flex-end;
  min-width: 32px;
`;
const Tabs = styled.nav`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(var(--border));
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid rgb(var(--border));
  background-color: rgb(var(--content));
  z-index: 99;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.5px solid transparent;
  padding: 0 16px;
  height: 39px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--greyscale400));
  cursor: pointer;
  ${p =>
    p.active &&
    css`
      border-color: rgb(var(--primary));
      font-weight: 700;
      color: rgb(var(--primary));
    `}
`;

export default Header;
