import styled from '@emotion/styled';
import format from 'date-fns/format';

import { IBlogReview } from 'types';
import { Box } from 'components/atoms';

interface IProps {
  review: IBlogReview;
}
const BlogReviewCard: React.FC<IProps> = ({ review }) => {
  const createdAt = format(new Date(review.createdAt), 'yyyy.MM.dd');

  return (
    <Container href={review.url} target="_blank" rel="noreferrer">
      <CreatedAt>{createdAt}</CreatedAt>
      <Box flexDirection="row">
        <Box flex="1">
          <Title>{review.title}</Title>
          <Desc>{review.desc}</Desc>
        </Box>

        {review.thumbnail && (
          <Thumbnail
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${review.thumbnail}`}
            alt={review.title}
          />
        )}
      </Box>
    </Container>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
const CreatedAt = styled.span`
  margin-bottom: 4px;
  font-size: 13px;
  color: rgb(var(--greyscale400));
`;
const Title = styled.strong`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: rgb(var(--text));
`;
const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: rgb(var(--grey));
  line-height: 20px;
  word-break: break-word;
`;
const Thumbnail = styled.img`
  margin-left: 16px;
  border-radius: 6px;
  width: 92px;
  height: 92px;
`;

export default BlogReviewCard;
