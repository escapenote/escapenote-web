import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import iconList from 'assets/icons/list.svg';
import iconApps from 'assets/icons/apps.svg';

const BottomNavigationBar: React.FC = () => {
  return (
    <Wrapper>
      <Nav>
        <NavItems />
      </Nav>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid rgb(var(--border));
  min-height: 70px;
  min-height: calc(70px + env(safe-area-inset-bottom));
  background-color: rgb(var(--content));
  z-index: 99;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  bottom: env(safe-area-inset-bottom);
  width: 100%;
`;
const NavBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 70px;
`;
const NavItem = styled.a<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  font-size: 12px;
  > svg {
    margin-bottom: 2px;
  }
  ${p =>
    p.isActive &&
    css`
      border: 1px solid rgb(var(--border));
      box-shadow: 2px 2px 2px rgb(var(--border));
    `}
`;

const NavItems: React.FC = () => {
  const router = useRouter();
  const isCafePage = ['/', '/cafes', '/cafes/[id]'].includes(router.pathname);
  const isThemePage = ['/themes', '/themes/[id]'].includes(router.pathname);

  return (
    <NavList>
      <NavBox>
        <Link href="/" passHref>
          <NavItem isActive={isCafePage}>
            <img src={iconList} alt="cafes" width="24px" height="24px" />
            지점목록
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/themes" passHref>
          <NavItem isActive={isThemePage}>
            <img src={iconApps} alt="themes" width="24px" height="24px" />
            테마
          </NavItem>
        </Link>
      </NavBox>
    </NavList>
  );
};
const NavList = styled.div`
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
`;

export default BottomNavigationBar;
