import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Layout from 'components/templates/Layout';
import Home from 'components/pages/Home';
import CafeList from 'components/pages/CafeList';
import ThemeList from 'components/pages/ThemeList';
import iconSearch from 'assets/icons/search.svg';

interface IProps {
  tab: string;
}
const ExplorePage: React.FC<IProps> = ({ tab }) => {
  const router = useRouter();

  return (
    <>
      <Layout
        title="탐색"
        rightAction={
          <>
            <ActionButton onClick={() => router.push('/search?tab=all')}>
              <img src={iconSearch} alt="search" width="24px" height="24px" />
            </ActionButton>
          </>
        }
      >
        <Tabs>
          <Tab
            role="button"
            active={tab === 'home'}
            onClick={() => router.replace('/')}
          >
            전체
          </Tab>
          <Tab
            role="button"
            active={tab === 'themes'}
            onClick={() => router.replace('/themes')}
          >
            테마
          </Tab>
          <Tab
            active={tab === 'cafes'}
            onClick={() => router.replace('/cafes')}
          >
            방탈출카페
          </Tab>
        </Tabs>

        {renderTabContents(tab)}
      </Layout>
    </>
  );
};

const renderTabContents = (tab: string) => {
  return {
    home: <Home />,
    cafes: <CafeList />,
    themes: <ThemeList />,
  }[tab];
};

const ActionButton = styled.button`
  width: 24px;
  height: 24px;
`;
const Tabs = styled.ul`
  display: flex;
  align-items: center;
  margin: -24px -24px 24px -24px;
  padding: 0 24px;
  border-bottom: 1px solid rgb(var(--greyscale100));
  height: 40px;
`;
const Tab = styled.li<{ active: boolean }>`
  margin-right: 20px;
  color: rgb(var(--greyscale400));
  cursor: pointer;
  ${p =>
    p.active &&
    css`
      font-weight: 700;
      color: rgb(var(--greyscale900));
    `}
`;

export default ExplorePage;
