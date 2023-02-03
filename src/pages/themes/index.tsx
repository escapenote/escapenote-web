import ThemeList from 'components/pages/ThemeList';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const ThemeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="테마 리스트 - 이스케이프노트"
        description="방탈출 테마의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes`}
      />

      <ThemeList />
    </>
  );
};

export default ThemeListPage;
