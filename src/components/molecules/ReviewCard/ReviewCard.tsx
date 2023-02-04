import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import format from 'date-fns/format';

import { ICafeReview, IThemeReview } from 'types';
import { Box, Stars } from 'components/atoms';
import iconAvatar from 'assets/icons/avatar.svg';

interface IProps {
  review: ICafeReview | IThemeReview;
}
const ReviewCard: React.FC<IProps> = ({ review }) => {
  const createdAt = format(new Date(review.createdAt), 'yyyy.MM.dd');
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overHeightText, setOverHeightText] = useState(false);

  useEffect(() => {
    handleAdjustHeight();
  }, [textRef]);

  function handleAdjustHeight() {
    if (!textRef.current) return;

    const { height } = textRef.current.getBoundingClientRect();
    if (height > 80) {
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

  return (
    <Container>
      <Box flexDirection="row" alignItems="center" mb="8px">
        <Image
          src={
            review.user.avatar
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${review.user.avatar}`
              : iconAvatar
          }
          alt={review.user.nickname}
        />
        <Link href={`/users/${review.user.nickname}`} passHref>
          <Nickname>{review.user.nickname}</Nickname>
        </Link>
        <CreatedAt>{createdAt}</CreatedAt>
      </Box>
      <Box>
        <Box mb="8px">
          <Rating>
            <Stars rating={review.rating} />
          </Rating>
        </Box>
        <Box alignItems="flex-start">
          <Text ref={textRef}>{review.text}</Text>
          {overHeightText && (
            <MoreText onClick={handleMoreText}>더보기</MoreText>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
const Image = styled.img`
  margin-right: 8px;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background-color: rgb(var(--greyscale50));
`;
const Nickname = styled.a`
  font-weight: 700;
  color: rgb(var(--greyscale700));
`;
const CreatedAt = styled.span`
  position: absolute;
  top: 19px;
  right: 0;
  color: rgb(var(--greyscale400));
`;
const Rating = styled.span``;
const Text = styled.p`
  color: rgb(var(--greyscale600));
  white-space: pre-line;
`;
const MoreText = styled.button`
  color: rgb(var(--primary));
`;

export default ReviewCard;
