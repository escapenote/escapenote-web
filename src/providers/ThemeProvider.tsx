import useTheme from 'hooks/useTheme';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  useTheme();

  return <>{children}</>;
};

export default ThemeProvider;
