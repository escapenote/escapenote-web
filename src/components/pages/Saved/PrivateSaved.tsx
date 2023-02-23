import { useRouter } from 'next/router';

import Layout from 'components/templates/Layout';
import SavedCafes from './SavedCafes';
import SavedThemes from './SavedThemes';

const PrivateSaved = () => {
  const router = useRouter();
  const tab = String(router.query.tab ?? 'themes');

  function handleChangeTab(activeTab: string) {
    const query = { tab: activeTab };
    router.replace({ query });
  }

  return (
    <Layout
      title="찜"
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
      {tab === 'cafes' ? <SavedCafes /> : <SavedThemes />}
    </Layout>
  );
};

export default PrivateSaved;
