import HeadPageMeta from 'components/templates/HeadPageMeta';
import CafeList from 'components/pages/CafeList';

const CafeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="카페 리스트 - Escape Note"
        description="카페 리스트입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}`}
      />

      <CafeList />
    </>
  );
};

export default CafeListPage;