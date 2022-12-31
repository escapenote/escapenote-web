import { useRouter } from 'next/router';

import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import ThemeList from 'components/pages/ThemeList';
import iconSearch from 'assets/icons/search.svg';
import iconFilter from 'assets/icons/filter.svg';

const ThemeListPage = () => {
  const router = useRouter();

  return (
    <>
      <HeadPageMeta
        title="테마 리스트 - Escape Note"
        description="테마 리스트입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes`}
      />

      <Layout
        title="테마"
        rightAction={
          <>
            <button
              style={{ marginRight: '16px' }}
              onClick={() => router.push('/search?tab=theme')}
            >
              <img src={iconSearch} alt="search" width="24px" height="24px" />
            </button>
            <button onClick={() => alert('해당 기능은 준비중입니다.')}>
              <img src={iconFilter} alt="filter" width="24px" height="24px" />
            </button>
          </>
        }
      >
        <ThemeList />
      </Layout>
    </>
  );
};

export default ThemeListPage;
