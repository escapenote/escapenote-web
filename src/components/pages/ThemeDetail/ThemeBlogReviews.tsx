import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import api from 'api';
import BlogReviewCard from 'components/molecules/BlogReviewCard';
import { Box, Button } from 'components/atoms';

interface IProps {
  themeId: string;
  reviewsCount: number;
}
const ThemeBlogReviews: React.FC<IProps> = ({ themeId, reviewsCount }) => {
  const router = useRouter();

  const {
    isLoading: blogLoading,
    data: blogReviews,
    error: blogError,
  } = useQuery(['fetchThemeBlogReviews', themeId, 5], () => {
    return api.themes.fetchThemeBlogReviews({ id: themeId, take: 5 });
  });

  return (
    <>
      <Items>
        {blogLoading ? (
          <Loading>로딩중...</Loading>
        ) : blogError ? (
          <Error>에러</Error>
        ) : blogReviews?.items.length === 0 ? (
          <NoData>데이터 없음</NoData>
        ) : (
          blogReviews?.items.map(review => (
            <Item key={review.id}>
              <BlogReviewCard review={review} />
            </Item>
          ))
        )}
      </Items>

      {reviewsCount > 5 && (
        <Box my="10px">
          <Button
            kind="primary"
            onClick={() => router.push(`/themes/${themeId}/blogs`)}
          >
            블로그 리뷰 더보기({reviewsCount})
          </Button>
        </Box>
      )}
    </>
  );
};

const Loading = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)`
  margin-bottom: 6px;
`;
const Items = styled.ul``;
const Item = styled.li`
  border-bottom: 1px solid rgb(var(--border));
  :last-of-type {
    border-bottom: none;
  }
`;

export default ThemeBlogReviews;
