import Link from 'next/link';
import styled from '@emotion/styled';

import { ICafe } from 'types';
import { Box, Stars } from 'components/atoms';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';

interface IProps {
  cafe: ICafe;
}
const CafeMiniCard: React.FC<IProps> = ({ cafe }) => {
  return (
    <Link href={`/cafes/${cafe.id}/themes`} passHref>
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
          <Rating>
            <Stars rating={cafe?.reviewsRating} />
            <span>
              {cafe?.reviewsRating}점({cafe?.reviewsCount})
            </span>
          </Rating>
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
const Rating = styled.span`
  margin-left: -1px;
  font-size: 10px;
  > span:last-of-type {
    margin-left: 4px;
  }
`;

export default CafeMiniCard;
