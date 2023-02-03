import CreateImage from 'components/pages/CreateImage';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const CreateImagePage = () => {
  return (
    <>
      <HeadPageMeta
        title="이미지 생성 - 이스케이프노트"
        description="이미지 생성"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/create/image`}
      />

      <CreateImage />
    </>
  );
};

export default CreateImagePage;
