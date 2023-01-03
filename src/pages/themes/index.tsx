import HeadPageMeta from 'components/templates/HeadPageMeta';
import ThemeList from 'components/pages/ThemeList';

const ThemeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="테마 리스트 - Escape Note"
        description="테마 리스트입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes`}
      />

      <ThemeList />
    </>
  );
};

export default ThemeListPage;
