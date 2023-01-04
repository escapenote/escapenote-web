import HeadPageMeta from 'components/templates/HeadPageMeta';
import Home from 'components/pages/Home';

const HomePage = () => {
  return (
    <>
      <HeadPageMeta
        title="ESCAPE NOTE"
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}`}
      />

      <Home />
    </>
  );
};

export default HomePage;
