import { useRouter } from 'next/router';

import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import CafeList from 'components/pages/CafeList';
import iconSearch from 'assets/icons/search.svg';
import iconFilter from 'assets/icons/filter.svg';

const CafeListPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="카페 리스트 - Escape Note"
        description="카페 리스트입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}`}
      />

      <Layout
        title="방탈출 카페"
        rightAction={
          <>
            <button
              style={{ marginRight: '16px' }}
              onClick={() => router.push('/search?tab=cafe')}
            >
              <img src={iconSearch} alt="search" width="24px" height="24px" />
            </button>
            <button onClick={() => alert('해당 기능은 준비중입니다.')}>
              <img src={iconFilter} alt="filter" width="24px" height="24px" />
            </button>
          </>
        }
      >
        <CafeList />
      </Layout>
    </>
  );
};

export default CafeListPage;
