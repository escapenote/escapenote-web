import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import iconHome from 'assets/icons/home.svg';
import iconHomeActive from 'assets/icons/home-active.svg';
import iconTicket from 'assets/icons/ticket.svg';
import iconTicketActive from 'assets/icons/ticket-active.svg';

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
  border-top: 1px solid rgb(var(--border));
  height: 64px;
  min-height: calc(64px + env(safe-area-inset-bottom));
  background-color: rgb(var(--content));
  z-index: 999;
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
  height: 64px;
`;
const NavItem = styled.a<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  font-size: 10px;
  color: rgb(var(--greyscale400));
  > img {
    margin-bottom: 4px;
  }
  ${p =>
    p.isActive &&
    css`
      color: rgb(var(--primary));
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
            <img
              src={isCafePage ? iconHomeActive : iconHome}
              alt="cafes"
              width="24px"
              height="24px"
            />
            방탈출 카페
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/themes" passHref>
          <NavItem isActive={isThemePage}>
            <img
              src={isThemePage ? iconTicketActive : iconTicket}
              alt="themes"
              width="24px"
              height="24px"
            />
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
