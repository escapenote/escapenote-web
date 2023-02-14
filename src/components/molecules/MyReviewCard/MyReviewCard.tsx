import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import format from 'date-fns/format';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { IDeleteCafeReviewProps } from 'api/cafeReviews';
import { IDeleteThemeReviewProps } from 'api/themeReviews';
import { ICafeReview, IThemeReview } from 'types';
import { useAppSelector } from 'store';
import { Box, Stars } from 'components/atoms';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';

type ReviewType = 'cafe' | 'theme';

interface IProps {
  type: ReviewType;
  review: ICafeReview | IThemeReview;
}
const MyReviewCard: React.FC<IProps> = ({ type, review }) => {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const createdAt = format(new Date(review.createdAt), 'yyyy.MM.dd');
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overHeightText, setOverHeightText] = useState(false);
  const isAuthor = user?.id === review.userId;

  const deleteCafeReview = useMutation(
    (data: IDeleteCafeReviewProps) => api.cafeReviews.deleteReview(data),
    {
      onSuccess: () => {
        alert('성공적으로 리뷰를 삭제하였습니다.');
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
      },
    },
  );
  const deleteThemeReview = useMutation(
    (data: IDeleteThemeReviewProps) => api.themeReviews.deleteReview(data),
    {
      onSuccess: () => {
        alert('성공적으로 리뷰를 삭제하였습니다.');
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
      },
    },
  );

  useEffect(() => {
    handleAdjustHeight();
  }, [textRef]);

  function handleAdjustHeight() {
    if (!textRef.current) return;

    const { height } = textRef.current.getBoundingClientRect();
    if (height > 84) {
      textRef.current.style.display = '-webkit-box';
      textRef.current.style.webkitLineClamp = '4';
      textRef.current.style.webkitBoxOrient = 'vertical';
      textRef.current.style.overflow = 'hidden';
      setOverHeightText(true);
    }
  }

  function handleMoreText() {
    if (!textRef.current) return;
    textRef.current.style.display = 'block';
    textRef.current.style.overflow = 'auto';
    setOverHeightText(false);
  }
  function handleUpdateReview() {
    if (type === 'cafe') {
      router.push(`/reviews/${review.id}/cafe`);
    } else {
      router.push(`/reviews/${review.id}/theme`);
    }
  }

  function handleDeleteReview() {
    const yn = window.confirm('정말로 삭제하시겠습니까?');
    if (yn) {
      if (type === 'cafe') {
        const cafeReview = review as ICafeReview;
        deleteCafeReview.mutate({ id: review.id, cafeId: cafeReview.cafeId });
      } else {
        const themeReview = review as IThemeReview;
        deleteThemeReview.mutate({
          id: review.id,
          themeId: themeReview.themeId,
        });
      }
    }
  }

  const themeReview = review as IThemeReview;
  const cafeReview = review as ICafeReview;

  return (
    <Container>
      <Box mr="16px">
        {type === 'theme' ? (
          <Link href={`/themes/${themeReview.themeId}`}>
            <a>
              <ThemeThumbnail
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${themeReview.theme.thumbnail}`}
                alt={themeReview.theme.name}
              />
            </a>
          </Link>
        ) : (
          <Link href={`/cafes/${cafeReview.cafeId}`}>
            <a>
              {cafeReview.cafe.images.length > 0 ? (
                <CafeThumbnail
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cafeReview.cafe.images[0]}`}
                  alt={cafeReview.cafe.name}
                />
              ) : (
                <CafeThumbnail
                  src={iconCafeThumbnail}
                  alt={cafeReview.cafe.name}
                />
              )}
            </a>
          </Link>
        )}
      </Box>

      <Box flex="1">
        <Box
          position="relative"
          flexDirection="row"
          alignItems="center"
          mb="8px"
        >
          {type === 'theme' ? (
            <Link href={`/themes/${themeReview.themeId}`}>
              <a>
                <Name>{themeReview.theme.name}</Name>
              </a>
            </Link>
          ) : (
            <Link href={`/cafes/${cafeReview.cafeId}`}>
              <a>
                <Name>{cafeReview.cafe.name}</Name>
              </a>
            </Link>
          )}
          <CreatedAt>{createdAt}</CreatedAt>
        </Box>

        <Box flexDirection="row" alignItems="baseline">
          {type === 'theme' && (
            <EscpaeYn success={(review as IThemeReview).success} />
          )}
          <Rating>
            <Stars rating={review.rating} />
          </Rating>
        </Box>

        {review.text && (
          <Box alignItems="flex-start" mt="8px">
            <Text ref={textRef}>{review.text}</Text>
            {overHeightText && (
              <MoreText onClick={handleMoreText}>더보기</MoreText>
            )}
          </Box>
        )}

        {isAuthor && (
          <Box flexDirection="row" justifyContent="flex-end" mt="8px" mb="-4px">
            <UpdateButton onClick={handleUpdateReview}>수정</UpdateButton>
            <DeleteButton onClick={handleDeleteReview}>삭제</DeleteButton>
          </Box>
        )}
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 16px 0;
`;
const ThemeThumbnail = styled.img`
  width: 86px;
  height: 106px;
`;
const CafeThumbnail = styled.img`
  border-radius: 32px;
  width: 64px;
  height: 64px;
`;
const Name = styled.strong`
  font-weight: 700;
  color: rgb(var(--greyscale700));
`;
const CreatedAt = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: rgb(var(--greyscale400));
`;
const EscpaeYn = styled.span<{ success: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  border-radius: 16px;
  border: 1px solid transparent;
  width: 34px;
  height: 18px;
  font-size: 10px;
  ${p =>
    p.success
      ? css`
          border-color: rgb(var(--success));
          ::after {
            content: '성공';
            color: rgb(var(--success));
          }
        `
      : css`
          border-color: rgb(var(--errorlight));
          ::after {
            content: '실패';
            color: rgb(var(--errorlight));
          }
        `}
`;
const Rating = styled.span``;
const Text = styled.p`
  color: rgb(var(--greyscale600));
  line-height: 21px;
  white-space: pre-line;
`;
const MoreText = styled.button`
  color: rgb(var(--primary));
`;
const UpdateButton = styled.button`
  margin-right: 8px;
  padding: 4px;
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const DeleteButton = styled.button`
  margin-right: -4px;
  padding: 4px;
  font-size: 12px;
  color: rgb(var(--primary));
`;

export default MyReviewCard;