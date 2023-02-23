import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

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
              <img
                className="invert"
                src={iconSearch}
                alt="search"
                width="24px"
                height="24px"
              />
            </ActionButton>
          </>
        }
        activeTab={tab}
        tabs={[
          { key: 'home', label: '전체', onClick: () => router.replace('/') },
          {
            key: 'themes',
            label: '테마',
            onClick: () => router.replace('/themes'),
          },
          {
            key: 'cafes',
            label: '방탈출카페',
            onClick: () => router.replace('/cafes'),
          },
        ]}
      >
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

export default ExplorePage;
