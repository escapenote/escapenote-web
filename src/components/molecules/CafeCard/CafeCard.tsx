import Link from 'next/link';
import styled from '@emotion/styled';

import { ICafe } from 'types';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';

interface IProps {
  cafe: ICafe;
}
const CafeCard: React.FC<IProps> = ({ cafe }) => {
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
        <Name>{cafe.name}</Name>
        <Location>
          {cafe.areaA} {cafe.areaB}
        </Location>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 40px rgba(17, 24, 39, 0.06);
`;
const Image = styled.img`
  margin-bottom: 12px;
  border-radius: 32px;
  width: 64px;
  height: 64px;
`;
const Name = styled.strong`
  margin-bottom: 4px;
  min-height: 35px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
const Location = styled.span`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;

export default CafeCard;
