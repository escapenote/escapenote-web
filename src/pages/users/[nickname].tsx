import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from 'api';
import { wrapper } from 'store';
import Profile from 'components/pages/Profile';
import HeadPageMeta from 'components/templates/HeadPageMeta';

const ProfilePage = () => {
  const router = useRouter();
  const nickname = router.query.nickname as string;

  const { data } = useQuery(['fetchUser', nickname], () => {
    return api.users.fetchUser({ nickname });
  });

  return (
    <>
      {data && (
        <HeadPageMeta
          title={`${nickname} 프로필 - 이스케이프노트`}
          description={`${data.type}의 방탈출 성향을 가진 ${data.nickname} 입니다.`}
          pageUrl={`${process.env.NEXT_PUBLIC_URL}/users/${nickname}`}
          {...(data.avatar && {
            imageUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.avatar}`,
          })}
        />
      )}

      <Profile user={data} />
    </>
  );
};

ProfilePage.getInitialProps = wrapper.getInitialPageProps(
  () =>
    async ({ req, query }) => {
      if (req) {
        const nickname = query.nickname as string;
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(['fetchUser', nickname], () => {
          return api.users.fetchUser({ nickname });
        });
        return { dehydratedState: dehydrate(queryClient), initial: true };
      }
      return { dehydratedState: null, initial: false };
    },
);

export default ProfilePage;
