import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ICafe } from 'types';
import { roundToDecimal } from 'utils/common';
import { useAppSelector } from 'store';
import { Stars } from 'components/atoms';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';
import iconBookmark from 'assets/icons/bookmark.svg';
import iconBookmarkActive from 'assets/icons/bookmark-active.svg';

interface IProps {
  cafe: ICafe;
  refetch?: any;
  hideSave?: boolean;
}
const CafeCard: React.FC<IProps> = ({ cafe, refetch, hideSave = false }) => {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);

  const saveMutation = useMutation(() => api.cafes.saveCafe({ id: cafe.id }), {
    onSuccess: () => refetch && refetch(),
    onError: ({ response }) => {
      const { detail } = response.data;
      alert(detail);
    },
  });
  const unSaveMutation = useMutation(
    () => api.cafes.unSaveCafe({ id: cafe.id }),
    {
      onSuccess: () => refetch && refetch(),
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
      },
    },
  );

  function handleSaveCafe(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    saveMutation.mutate();
  }

  function handleUnSaveCafe(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    unSaveMutation.mutate();
  }

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
        <Name>{cafe.name}</Name>
        <Location>
          {cafe.areaA} {cafe.areaB}
        </Location>
        <Rating>
          <Stars rating={cafe?.reviewsRating} />
          <span>
            {roundToDecimal(cafe?.reviewsRating)}점({cafe?.reviewsCount})
          </span>
        </Rating>

        {!hideSave && (
          <>
            {cafe?.saves && cafe?.saves.length > 0 ? (
              <SaveButton onClick={handleUnSaveCafe}>
                <img
                  src={iconBookmarkActive}
                  alt="save-active"
                  width="14px"
                  height="14px"
                />
              </SaveButton>
            ) : (
              <SaveButton onClick={handleSaveCafe}>
                <img src={iconBookmark} alt="save" width="14px" height="14px" />
              </SaveButton>
            )}
          </>
        )}
      </Container>
    </Link>
  );
};

const Container = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 24px 18px;
  box-shadow: 0 0 40px rgba(var(--text), 0.06);
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
  word-break: keep-all;
`;
const Location = styled.span`
  margin-bottom: 4px;
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
const SaveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  z-index: 9;
`;

export default CafeCard;
