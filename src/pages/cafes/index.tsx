import Explore from 'components/pages/Explore';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const CafeListPage = () => {
  return (
    <>
      <HeadPageMeta
        title="카페 리스트 - 이스케이프노트"
        description="방탈출 카페의 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/cafes`}
      />

      <Explore tab="cafes" />
    </>
  );
};

export default CafeListPage;
