import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IUser } from 'types';
import { useAppSelector } from 'store';
import iconExplore from 'assets/icons/explore.svg';
import iconExploreActive from 'assets/icons/explore-active.svg';
import iconBookmark from 'assets/icons/bookmark.svg';
import iconBookmarkActive from 'assets/icons/bookmark-active.svg';
import iconProfile from 'assets/icons/profile.svg';
import iconProfileActive from 'assets/icons/profile-active.svg';

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
  height: 56px;
  min-height: calc(56px + env(safe-area-inset-bottom));
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
  height: 56px;
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
  height: 56px;
  font-size: 10px;
  font-weight: 500;
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
  const isExplorePage = [
    '/',
    '/cafes',
    '/cafes/[id]',
    '/themes',
    '/themes/[id]',
  ].includes(router.pathname);
  const isSavedPage = ['/saved'].includes(router.pathname);

  return (
    <NavItems>
      <NavBox>
        <Link href="/" passHref>
          <NavItem isActive={isExplorePage}>
            <img
              src={isExplorePage ? iconExploreActive : iconExplore}
              alt="explore"
              width="24px"
              height="24px"
            />
            탐색
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/saved" passHref>
          <NavItem isActive={isSavedPage}>
            <img
              src={isSavedPage ? iconBookmarkActive : iconBookmark}
              alt="bookmark"
              width="24px"
              height="24px"
            />
            찜
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
  const isExplorePage = [
    '/',
    '/cafes',
    '/cafes/[id]',
    '/themes',
    '/themes/[id]',
  ].includes(router.pathname);
  const isSavedPage = ['/saved'].includes(router.pathname);
  const isProfilePage = ['/users/[nickname]'].includes(router.pathname);

  return (
    <NavItems>
      <NavBox>
        <Link href="/" passHref>
          <NavItem isActive={isExplorePage}>
            <img
              src={isExplorePage ? iconExploreActive : iconExplore}
              alt="explore"
              width="24px"
              height="24px"
            />
            탐색
          </NavItem>
        </Link>
      </NavBox>
      <NavBox>
        <Link href="/saved" passHref>
          <NavItem isActive={isSavedPage}>
            <img
              src={isSavedPage ? iconBookmarkActive : iconBookmark}
              alt="bookmark"
              width="24px"
              height="24px"
            />
            찜
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
