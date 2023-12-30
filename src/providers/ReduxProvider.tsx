import { Provider } from 'react-redux';

type Props = {
  store: any;
  children: React.ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ store, children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
