import Saved from 'components/pages/Saved';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const SavedPage = () => {
  return (
    <>
      <HeadPageMeta
        title="찜 리스트 - 이스케이프노트"
        description="방탈출 카페와 테마를 추천하고 기록을 관리하며, 방탈출 애호가들과 소통할 수 있는 커뮤니티 플랫폼입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/saved`}
      />

      <Saved />
    </>
  );
};

export default SavedPage;
