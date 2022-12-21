import Link from 'next/link';
import styled from '@emotion/styled';

import { ICafe } from 'types';
import { Box } from 'components/atoms';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';

interface IProps {
  cafe: ICafe;
}
const CafeMiniCard: React.FC<IProps> = ({ cafe }) => {
  return (
    <Link href={`/cafes/${cafe.id}`} passHref>
      <Container>
        {cafe.images.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cafe.images[0]}`}
            alt={cafe.name}
          />
        ) : (
          <Image src={iconCafeThumbnail} alt={cafe.name} />
        )}
        <Box>
          <Name>{cafe.name}</Name>
          <Location>
            {cafe.areaA} {cafe.areaB}
          </Location>
        </Box>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Image = styled.img`
  margin-right: 16px;
  border-radius: 24px;
  width: 48px;
  height: 48px;
`;
const Name = styled.strong`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 700;
`;
const Location = styled.span`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;

export default CafeMiniCard;
