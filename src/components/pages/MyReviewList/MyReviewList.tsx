import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';
import ThemeReviews from './ThemeReviews';
import CafeReviews from './CafeReviews';

interface IProps {
  nickname: string;
}
const MyReviewList: React.FC<IProps> = ({ nickname }) => {
  const router = useRouter();
  const tab = String(router.query.tab ?? 'themes');

  function handleGoBack() {
    router.back();
  }

  function handleChangeTab(activeTab: string) {
    const query = { ...router.query, tab: activeTab };
    router.replace({ query });
  }

  return (
    <Layout
      title="리뷰 작성 내역"
      leftAction={<Back onClick={handleGoBack} />}
      rightAction={<></>}
    >
      <Tabs>
        <Tab
          role="button"
          active={tab === 'themes'}
          onClick={() => handleChangeTab('themes')}
        >
          테마
        </Tab>
        <Tab active={tab === 'cafes'} onClick={() => handleChangeTab('cafes')}>
          방탈출카페
        </Tab>
      </Tabs>
      {tab === 'themes' ? (
        <ThemeReviews nickname={nickname} />
      ) : (
        <CafeReviews nickname={nickname} />
      )}
    </Layout>
  );
};

const Tabs = styled.ul`
  display: flex;
  align-items: center;
  margin: -24px -24px 8px -24px;
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

export default MyReviewList;
