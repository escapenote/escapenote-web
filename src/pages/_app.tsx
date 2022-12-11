import { useRef } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';

import globalStyles from '../styles/globalStyles';
import { wrapper } from 'store';
import HeadDefaultMeta from 'components/templates/HeadDefaultMeta';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
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

MyApp.getInitialProps = wrapper.getInitialAppProps(() => async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return appProps;
});

export default wrapper.withRedux(MyApp);
