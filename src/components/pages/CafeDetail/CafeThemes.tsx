import styled from '@emotion/styled';

import api from 'api';
import ThemeCard from 'components/molecules/ThemeCard';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  cafeId: string;
}
const CafeThemes: React.FC<IProps> = ({ cafeId }) => {
  const { isLoading, data, error, refetch } = useQuery(
    ['fetchThemes', 'cafe', cafeId],
    () => {
      return api.themes.fetchThemes({ cafeId });
    },
  );

  return (
    <List>
      {isLoading ? (
        <Loading>로딩중...</Loading>
      ) : error ? (
        <Error>에러</Error>
      ) : data?.items.length === 0 ? (
        <NoData>데이터가 없습니다.</NoData>
      ) : (
        data?.items.map(theme => (
          <Item key={theme.id}>
            <ThemeCard theme={theme} refetch={refetch} />
          </Item>
        ))
      )}
    </List>
  );
};

const Loading = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const List = styled.ul`
  padding-top: 18px;
`;
const Item = styled.li`
  margin-bottom: 18px;
`;

export default CafeThemes;
