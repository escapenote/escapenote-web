import HeadPageMeta from 'components/templates/HeadPageMeta';
import Search from 'components/pages/Search';

const SearchPage = () => {
  return (
    <>
      <HeadPageMeta
        title="통합 검색 - ESCAPE NOTE"
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/search`}
      />

      <Search />
    </>
  );
};

export default SearchPage;
