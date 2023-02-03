import { useRouter } from 'next/router';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import api from 'api';
import { useAppSelector, wrapper } from 'store';
import ThemeDetail from 'components/pages/ThemeDetail';
import HeadPageMeta from 'components/templates/HeadPageMeta';
import Layout from 'components/templates/Layout';
import { Back } from 'components/atoms';
import iconBookmark from 'assets/icons/bookmark.svg';
import iconBookmarkActive from 'assets/icons/bookmark-active.svg';

interface IProps {
  initial: boolean;
}
const ThemeDetailPage = ({ initial }: IProps) => {
  const router = useRouter();
  const id = String(router.query.id);

  const user = useAppSelector(state => state.auth.user);
  const { data, refetch } = useQuery(['fetchTheme', Boolean(user), id], () => {
    return api.themes.fetchTheme({ id });
  });

  function handleGoBack() {
    if (initial) router.push('/');
    else router.back();
  }

  const saveMutation = useMutation(() => api.themes.saveTheme({ id }), {
    onSuccess: () => refetch(),
    onError: ({ response }) => {
      const { detail } = response.data;
      alert(detail);
    },
  });
  const unSaveMutation = useMutation(() => api.themes.unSaveTheme({ id }), {
    onSuccess: () => refetch(),
    onError: ({ response }) => {
      const { detail } = response.data;
      alert(detail);
    },
  });

  function handleSaveTheme() {
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    saveMutation.mutate();
  }

  function handleUnSaveTheme() {
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
          title={`${data.name} - 이스케이프노트`}
          description={data.intro}
          pageUrl={`${process.env.NEXT_PUBLIC_URL}/themes/${id}`}
          imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.thumbnail}`}
        />
      )}

      <Layout
        title="테마"
        leftAction={<Back onClick={handleGoBack} />}
        rightAction={
          data?.saves && data.saves.length > 0 ? (
            <button onClick={handleUnSaveTheme}>
              <img
                src={iconBookmarkActive}
                alt="save-active"
                width="24px"
                height="24px"
              />
            </button>
          ) : (
            <button onClick={handleSaveTheme}>
              <img src={iconBookmark} alt="save" width="24px" height="24px" />
            </button>
          )
        }
        noBottom
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
        return { dehydratedState: dehydrate(queryClient), initial: true };
      }
      return { dehydratedState: null, initial: false };
    },
);

export default ThemeDetailPage;
