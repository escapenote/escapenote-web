import { useRef, useEffect } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';

import globalStyles from '../styles/globalStyles';
import { useAppDispatch, wrapper } from 'store';
import { currentAuthenticatedUserAsync } from 'store/authSlice';
import { fetchCommonData } from 'store/dataSlice';
import { setTheme } from 'store/commonSlice';
import HeadDefaultMeta from 'components/templates/HeadDefaultMeta';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  useEffect(() => {
    dispatch(fetchCommonData());

    const currentTheme = getUserPreference();
    dispatch(setTheme(currentTheme));
    document.body.dataset.theme = currentTheme;
  }, []);

  function getUserPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return (
    <>
      <HeadDefaultMeta />

      <Global styles={globalStyles} />

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={(pageProps as any).dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
  store => async appContext => {
    const { req } = appContext.ctx;

    if (req) {
      await store.dispatch(currentAuthenticatedUserAsync(req.headers.cookie));
    }

    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  },
);

export default wrapper.withRedux(MyApp);
