import { useRouter } from 'next/router';

import GenreDetail from 'components/pages/GenreDetail';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const GenreDetailPage = () => {
  const router = useRouter();
  const name = String(router.query.name);

  return (
    <>
      <HeadPageMeta
        title={`#${name} - Escape Note`}
        description="방탈출에 대한 모든 것"
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/explore/genre/${name}`}
      />

      <Layout
        title={`#${name}`}
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        hideBottom
      >
        <GenreDetail genre={name} />
      </Layout>
    </>
  );
};

export default GenreDetailPage;
