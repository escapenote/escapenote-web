import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from 'api';
import { wrapper } from 'store';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';

const CafeDetail = dynamic(() => import('components/pages/CafeDetail'));

const CafeDetailPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data } = useQuery(['fetchCafe', id], () => {
    return api.cafes.fetchCafe({ id });
  });

  return (
    <>
      {data && (
        <HeadPageMeta
          title={`${data.name} - Escape Note`}
          description={data.addressLine}
          pageUrl={`${process.env.NEXT_PUBLIC_URL}/cafes/${id}`}
          {...(data.images && {
            imageUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.images[0]}`,
          })}
        />
      )}

      <Layout leftAction={<Back onClick={router.back} />} hideBottom>
        <CafeDetail id={id} cafe={data} />
      </Layout>
    </>
  );
};

CafeDetailPage.getInitialProps = wrapper.getInitialPageProps(
  store =>
    async ({ req, query }) => {
      if (req) {
        const id = query.id as string;
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(['fetchCafe', id], () => {
          return api.cafes.fetchCafe({ id });
        });
        return { dehydratedState: dehydrate(queryClient) };
      }
      return { dehydratedState: null };
    },
);

export default CafeDetailPage;
