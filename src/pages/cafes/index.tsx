import CafeList from 'components/pages/CafeList';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const CafeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="카페 리스트 - Escape Note"
        description="방탈출 카페의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/cafes`}
      />

      <CafeList />
    </>
  );
};

export default CafeListPage;
