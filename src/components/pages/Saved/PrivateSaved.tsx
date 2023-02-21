import { useRouter } from 'next/router';

import Layout from 'components/templates/Layout';
import SavedCafes from './SavedCafes';
import SavedThemes from './SavedThemes';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const PrivateSaved = () => {
  const router = useRouter();
  const tab = String(router.query.tab ?? 'themes');

  function handleChangeTab(activeTab: string) {
    const query = { tab: activeTab };
    router.replace({ query });
  }

  return (
    <Layout title="찜">
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
      {tab === 'cafes' ? <SavedCafes /> : <SavedThemes />}
    </Layout>
  );
};

const Tabs = styled.ul`
  display: flex;
  align-items: center;
  margin: -24px -24px 24px -24px;
  padding: 0 24px;
  border-bottom: 1px solid rgb(var(--border));
`;
const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.5px solid transparent;
  padding: 0 16px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--greyscale400));
  cursor: pointer;
  ${p =>
    p.active &&
    css`
      border-color: rgb(var(--primary));
      font-weight: 700;
      color: rgb(var(--primary));
    `}
`;

export default PrivateSaved;
