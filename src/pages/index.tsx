import Explore from 'components/pages/Explore';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const HomePage = () => {
  return (
    <>
      <HeadPageMeta
        title="이스케이프노트"
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}`}
      />

      <Explore tab="home" />
    </>
  );
};

export default HomePage;
