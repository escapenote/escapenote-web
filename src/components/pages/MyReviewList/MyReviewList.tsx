import React from 'react';
import { useRouter } from 'next/router';

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
      activeTab={tab}
      tabs={[
        {
          key: 'themes',
          label: '테마',
          onClick: () => handleChangeTab('themes'),
        },
        {
          key: 'cafes',
          label: '방탈출카페',
          onClick: () => handleChangeTab('cafes'),
        },
      ]}
    >
      {tab === 'themes' ? (
        <ThemeReviews nickname={nickname} />
      ) : (
        <CafeReviews nickname={nickname} />
      )}
    </Layout>
  );
};

export default MyReviewList;
