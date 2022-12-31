import { useRef } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import globalStyles from '../styles/globalStyles';
import { wrapper } from 'store';
import HeadDefaultMeta from 'components/templates/HeadDefaultMeta';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <PersistGate persistor={(store as any).__persistor} loading={<>로딩중</>}>
      <HeadDefaultMeta />

      <Global styles={globalStyles} />

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={(pageProps as any).dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </PersistGate>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(() => async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return appProps;
});

export default wrapper.withRedux(MyApp);
