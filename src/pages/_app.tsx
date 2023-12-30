import { useEffect } from 'react';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import globalStyles from '../styles/globalStyles';
import { useAppDispatch, wrapper } from 'store';
import { currentAuthenticatedUserAsync } from 'store/authSlice';
import { fetchCommonData } from 'store/dataSlice';
import HeadDefaultMeta from 'components/templates/HeadDefaultMeta';
import A2HS from 'components/organisms/A2HS';
import Providers from 'providers';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommonData());
  }, []);

  return (
    <>
      <HeadDefaultMeta />

      <Global styles={globalStyles} />

      <Providers store={store} pageProps={props.pageProps}>
        <Component {...props.pageProps} />
        <A2HS />
      </Providers>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
  store => async appContext => {
    const { req } = appContext.ctx;

    if (req) {
      // 현재 인증된 사용자의 정보를 가져와서 저장합니다.
      await store.dispatch(currentAuthenticatedUserAsync(appContext.ctx));
    }

    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  },
);

export default wrapper.withRedux(MyApp);
