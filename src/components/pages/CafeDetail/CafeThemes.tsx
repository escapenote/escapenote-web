import styled from '@emotion/styled';

import { ITheme } from 'types';
import ThemeCard from 'components/molecules/ThemeCard';

interface IProps {
  themes?: ITheme[];
}
const CafeThemes: React.FC<IProps> = ({ themes }) => {
  return (
    <List>
      {themes?.map(theme => (
        <Item key={theme.id}>
          <ThemeCard theme={theme} />
        </Item>
      ))}
    </List>
  );
};

const List = styled.ul`
  padding-top: 18px;
`;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default CafeThemes;
