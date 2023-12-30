import { AuthProvider } from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import ReduxProvider from './ReduxProvider';
import ThemeProvider from './ThemeProvider';

type Props = {
  store: any;
  pageProps: any;
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ store, pageProps, children }) => {
  return (
    <ReactQueryProvider pageProps={pageProps}>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
