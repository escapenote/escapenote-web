import Search from 'components/pages/Search';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const SearchPage = () => {
  return (
    <>
      <HeadPageMeta
        title="통합 검색 - Escape Note"
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/search`}
      />

      <Search />
    </>
  );
};

export default SearchPage;
