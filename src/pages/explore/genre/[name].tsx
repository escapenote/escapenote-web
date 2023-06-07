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
        title={`#${name} - 이스케이프노트`}
        description="방탈출 카페와 테마를 추천하고 기록을 관리하며, 방탈출 애호가들과 소통할 수 있는 커뮤니티 플랫폼입니다."
        pageUrl={`${process.env.NEXT_PUBLIC_URL}/explore/genre/${name}`}
      />

      <Layout
        title={`#${name}`}
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        noBottom
      >
        <GenreDetail genre={name} />
      </Layout>
    </>
  );
};

export default GenreDetailPage;
