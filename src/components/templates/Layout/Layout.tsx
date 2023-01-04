import React from 'react';
import styled from '@emotion/styled';

import AppBar from 'components/organisms/AppBar';
import BottomNavigationBar from 'components/organisms/BottomNavigationBar';

interface IProps {
  title?: string;
  subTitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  hideBottom?: boolean;
  appBar?: React.ReactNode;
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({
  title,
  subTitle,
  leftAction,
  rightAction,
  hideBottom = false,
  appBar,
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
      />
      <Main>{children}</Main>
      {!hideBottom && <BottomNavigationBar />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: stretch;
  margin: 0;
  padding: 80px 24px 96px 24px;
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
  overflow: hidden;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;

export default Layout;
