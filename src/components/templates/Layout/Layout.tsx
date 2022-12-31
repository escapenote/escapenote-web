import React from 'react';
import styled from '@emotion/styled';

import AppBar from 'components/organisms/AppBar';
import BottomNavigationBar from 'components/organisms/BottomNavigationBar';

interface IProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  hideBottom?: boolean;
  appBar?: React.ReactNode;
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({
  title,
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
  flex: 1;
`;
const Main = styled.main`
  padding: 80px 24px 88px 24px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;

export default Layout;
