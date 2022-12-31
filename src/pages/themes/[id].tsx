import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from 'api';
import { wrapper } from 'store';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const ThemeDetail = dynamic(() => import('components/pages/ThemeDetail'));

const ThemeDetailPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data } = useQuery(['fetchTheme', id], () => {
    return api.themes.fetchTheme({ id });
  });

  return (
    <>
      {data && (
        <HeadPageMeta
          title={`${data.name} - Escape Note`}
          description={data.intro}
          pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes/${id}`}
          imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.thumbnail}`}
        />
      )}

      <Layout
        title="테마"
        leftAction={<Back onClick={router.back} />}
        rightAction={<></>}
        hideBottom
      >
        <ThemeDetail id={id} theme={data} />
      </Layout>
    </>
  );
};

ThemeDetailPage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ req, query }) => {
      if (req) {
        const id = query.id as string;
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(['fetchTheme', id], () => {
          return api.themes.fetchTheme({ id });
        });
        return { dehydratedState: dehydrate(queryClient) };
      }
      return { dehydratedState: null };
    },
);

export default ThemeDetailPage;
