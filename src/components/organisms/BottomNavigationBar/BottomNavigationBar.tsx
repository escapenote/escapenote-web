import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useAppSelector } from 'store';
import iconHome from 'assets/icons/home.svg';
import iconHomeActive from 'assets/icons/home-active.svg';
import iconCafe from 'assets/icons/cafe.svg';
import iconCafeActive from 'assets/icons/cafe-active.svg';
import iconTicket from 'assets/icons/ticket.svg';
import iconTicketActive from 'assets/icons/ticket-active.svg';
import iconProfile from 'assets/icons/profile.svg';
import iconProfileActive from 'assets/icons/profile-active.svg';
import { IUser } from 'types';

const BottomNavigationBar: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  return (
    <Wrapper>
      <Nav>{user ? <PrivateNav user={user} /> : <PublicNav />}</Nav>
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
const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
`;
const NavItem = styled.a<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  font-size: 12px;
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

const PublicNav: React.FC = () => {
  const router = useRouter();
  const isHomePage = ['/'].includes(router.pathname);
  const isCafePage = ['/cafes', '/cafes/[id]'].includes(router.pathname);
  const isThemePage = ['/themes', '/themes/[id]'].includes(router.pathname);

  return (
    <NavItems>
      <NavBox>
        <Link href="/" passHref>
          <NavItem isActive={isHomePage}>
            <img
              src={isHomePage ? iconHomeActive : iconHome}
              alt="home"
              width="24px"
              height="24px"
            />
            홈
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/cafes" passHref>
          <NavItem isActive={isCafePage}>
            <img
              src={isCafePage ? iconCafeActive : iconCafe}
              alt="cafe"
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
              alt="theme"
              width="24px"
              height="24px"
            />
            테마
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/accounts/login" passHref>
          <NavItem>
            <img src={iconProfile} alt="profile" width="24px" height="24px" />
            프로필
          </NavItem>
        </Link>
      </NavBox>
    </NavItems>
  );
};

interface IPrivateNavProps {
  user: IUser;
}
const PrivateNav: React.FC<IPrivateNavProps> = ({ user }) => {
  const router = useRouter();
  const isHomePage = ['/'].includes(router.pathname);
  const isCafePage = ['/cafes', '/cafes/[id]'].includes(router.pathname);
  const isThemePage = ['/themes', '/themes/[id]'].includes(router.pathname);
  const isProfilePage = ['/users/[nickname]'].includes(router.pathname);

  return (
    <NavItems>
      <NavBox>
        <Link href="/" passHref>
          <NavItem isActive={isHomePage}>
            <img
              src={isHomePage ? iconHomeActive : iconHome}
              alt="home"
              width="24px"
              height="24px"
            />
            홈
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/cafes" passHref>
          <NavItem isActive={isCafePage}>
            <img
              src={isCafePage ? iconCafeActive : iconCafe}
              alt="cafe"
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
              alt="theme"
              width="24px"
              height="24px"
            />
            테마
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href={`/users/${user.nickname}`} passHref>
          <NavItem isActive={isProfilePage}>
            <img
              src={isProfilePage ? iconProfileActive : iconProfile}
              alt="profile"
              width="24px"
              height="24px"
            />
            프로필
          </NavItem>
        </Link>
      </NavBox>
    </NavItems>
  );
};

export default BottomNavigationBar;
