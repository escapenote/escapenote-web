import Link from 'next/link';
import styled from '@emotion/styled';

import { ICafe } from 'types';

interface IProps {
  cafe: ICafe;
}
const CafeCard: React.FC<IProps> = ({ cafe }) => {
  return (
    <Link href={`/cafes/${cafe.id}`} passHref>
      <Container>
        <Name>{cafe.name}</Name>
        <Themes>
          {cafe.themes.map(theme => (
            <img
              key={theme.id}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
              alt={theme.name}
              width="100px"
              height="160px"
            />
          ))}
        </Themes>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0 20px 12px 20px;
  border: 1px solid rgb(var(--border));
  padding: 10px;
`;
const Name = styled.strong`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
`;
const Themes = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  > img {
    margin-right: 10px;
  }
`;

export default CafeCard;
