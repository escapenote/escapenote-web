import HeadPageMeta from 'components/templates/HeadPageMeta';
import Search from 'components/pages/Search';

const SearchPage = () => {
  return (
    <>
      <HeadPageMeta
        title="검색 - Escape Note"
        description="검색 페이지입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/search`}
      />

      <Search />
    </>
  );
};

export default SearchPage;
