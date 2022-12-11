import React from 'react';
import styled from '@emotion/styled';

import AppBar from 'components/organisms/AppBar';
import BottomNavigationBar from 'components/organisms/BottomNavigationBar';

interface IProps {
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({ leftAction, rightAction, children }) => {
  return (
    <Wrapper>
      <AppBar leftAction={leftAction} rightAction={rightAction} />
      <Main>{children}</Main>
      <BottomNavigationBar />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1;
`;
const Main = styled.main`
  padding: 70px 0;
  border: 1px solid rgb(var(--border));
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (min-width: 480px) {
    margin: 0 auto;
    padding: 70px 0;
    max-width: 480px;
  }
`;

export default Layout;
