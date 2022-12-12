import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import ThemeList from 'components/pages/ThemeList';

const ThemeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="테마 리스트 - Escape Note"
        description="테마 리스트입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes`}
      />

      <Layout>
        <ThemeList />
      </Layout>
    </>
  );
};

export default ThemeListPage;
