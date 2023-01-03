import HeadPageMeta from 'components/templates/HeadPageMeta';
import Home from 'components/pages/Home';

const HomePage = () => {
  return (
    <>
      <HeadPageMeta
        title="Escape Note"
        description="전국 방탕출 모두 다있다!"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}`}
      />

      <Home />
    </>
  );
};

export default HomePage;
