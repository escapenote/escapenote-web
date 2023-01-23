import { useRouter } from 'next/router';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import api from 'api';
import { useAppSelector, wrapper } from 'store';
import CafeDetail from 'components/pages/CafeDetail';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';
import iconHeart from 'assets/icons/heart.svg';
import iconHeartActive from 'assets/icons/heart-active.svg';

interface IProps {
  initial: boolean;
}
const CafeDetailPage = ({ initial }: IProps) => {
  const router = useRouter();
  const id = String(router.query.id);

  const user = useAppSelector(state => state.auth.user);
  const { data, refetch } = useQuery(['fetchCafe', id], () => {
    return api.cafes.fetchCafe({ id });
  });

  function handleGoBack() {
    if (initial) router.push('/');
    else router.back();
  }

  const saveMutation = useMutation(() => api.cafes.saveCafe({ id }), {
    onSuccess: () => refetch(),
    onError: ({ response }) => {
      const { detail } = response.data;
      alert(detail);
    },
  });
  const unSaveMutation = useMutation(() => api.cafes.unSaveCafe({ id }), {
    onSuccess: () => refetch(),
    onError: ({ response }) => {
      const { detail } = response.data;
      alert(detail);
    },
  });

  function handleSaveCafe() {
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    saveMutation.mutate();
  }

  function handleUnSaveCafe() {
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    unSaveMutation.mutate();
  }

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

      <Layout
        title="카페"
        leftAction={<Back onClick={handleGoBack} />}
        rightAction={
          data?.saves && data.saves.length > 0 ? (
            <button onClick={handleUnSaveCafe}>
              <img
                src={iconHeartActive}
                alt="save-filled"
                width="24px"
                height="24px"
              />
            </button>
          ) : (
            <button onClick={handleSaveCafe}>
              <img src={iconHeart} alt="save" width="24px" height="24px" />
            </button>
          )
        }
        hideBottom
      >
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
        return { dehydratedState: dehydrate(queryClient), initial: true };
      }
      return { dehydratedState: null, initial: false };
    },
);

export default CafeDetailPage;
