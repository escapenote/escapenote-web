import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { IWriteReviewOnCafeProps } from 'api/cafes';
import { Box, Button } from 'components/atoms';
import iconStarYellow from 'assets/icons/star-yellow.svg';
import iconStarGrey from 'assets/icons/star-grey.svg';

interface IProps {
  id: string;
}
const CreateCafeReview: React.FC<IProps> = ({ id }) => {
  const router = useRouter();

  const [rating, setRating] = useState(1);
  const [ratingHover, setRatingHover] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const mutation = useMutation(
    (data: IWriteReviewOnCafeProps) => api.cafes.writeReviewOnCafe(data),
    {
      onSuccess: () => {
        alert('리뷰가 작성되었습니다.');
        setSubmitting(false);
        return router.back();
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    mutation.mutate({ id, rating, text });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <BorderBox>
        <Label required>카페점수</Label>
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                type="button"
                onClick={() => setRating(index)}
                onMouseEnter={() => setRatingHover(index)}
                onMouseLeave={() => setRatingHover(rating)}
              >
                <img
                  key={index}
                  src={
                    index <= (ratingHover || rating)
                      ? iconStarYellow
                      : iconStarGrey
                  }
                  alt="star"
                  width="40px"
                  height="40px"
                />
              </Star>
            );
          })}
        </Box>
      </BorderBox>

      <DefaultBox>
        <Label>내용</Label>
        <Textarea
          placeholder="내용을 입력해주세요."
          rows={7}
          maxLength={1000}
          onChange={e => setText(e.target.value)}
        />
      </DefaultBox>

      <Box mt="auto">
        <Button type="submit" kind="primary" disabled={!rating || submitting}>
          {submitting ? '로딩중...' : '작성완료'}
        </Button>
      </Box>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const DefaultBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;
const BorderBox = styled(DefaultBox)`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border-bottom: 1px solid rgb(var(--border));
  padding-bottom: 16px;
`;
const Label = styled.label<{ required?: boolean }>`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 16px;
  ${p =>
    p.required &&
    css`
      ::after {
        content: '*';
        color: rgb(var(--error));
      }
    `}
`;
const Star = styled.button`
  padding: 0 8px;
`;
const Textarea = styled.textarea`
  border: none;
  border-radius: 19px;
  padding: 18px 20px;
  background-color: rgb(var(--background));
  resize: none;
`;

export default CreateCafeReview;
