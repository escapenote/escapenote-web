import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ITabOption } from 'types';
import AppBar from 'components/organisms/AppBar';
import BottomNavigationBar from 'components/organisms/BottomNavigationBar';

interface IProps {
  title?: string;
  subTitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  noPadding?: boolean;
  noBottom?: boolean;
  appBar?: React.ReactNode;
  activeTab?: string;
  tabs?: ITabOption[];
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({
  title,
  subTitle,
  leftAction,
  rightAction,
  noPadding = false,
  noBottom = false,
  appBar,
  activeTab,
  tabs,
  children,
}) => {
  return (
    <Wrapper>
      <AppBar
        title={title}
        subTitle={subTitle}
        leftAction={leftAction}
        rightAction={rightAction}
        appBar={appBar}
        activeTab={activeTab}
        tabs={tabs}
      />
      <Main isTabs={Boolean(tabs)} noPadding={noPadding} noBottom={noBottom}>
        {children}
      </Main>
      {!noBottom && <BottomNavigationBar />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Main = styled.main<{
  isTabs: boolean;
  noPadding: boolean;
  noBottom: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: stretch;
  padding: 80px 24px 96px 24px;
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
  width: 100%;
  overflow: hidden;
  ${p =>
    p.isTabs &&
    css`
      padding-top: 120px;
    `}
  ${p =>
    p.noBottom &&
    css`
      padding-bottom: calc(24px + env(safe-area-inset-bottom));
    `}
  ${p =>
    p.noPadding &&
    css`
      padding: 0;
      padding-top: ${p.isTabs ? '86px' : '56px'};
      padding-bottom: calc(0 + env(safe-area-inset-bottom));
    `}
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;

export default Layout;
