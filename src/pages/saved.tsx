import Saved from 'components/pages/Saved';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const SavedPage = () => {
  return (
    <>
      <HeadPageMeta
        title="찜 리스트 - 이스케이프노트"
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/saved`}
      />

      <Saved />
    </>
  );
};

export default SavedPage;
