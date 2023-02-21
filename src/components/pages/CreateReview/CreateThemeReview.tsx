import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { IWriteReviewOnThemeProps } from 'api/themes';
import { Box, Button } from 'components/atoms';
import iconStarYellow from 'assets/icons/star-yellow.svg';
import iconStarGrey from 'assets/icons/star-grey.svg';

interface IProps {
  id: string;
}
const CreateThemeReview: React.FC<IProps> = ({ id }) => {
  const router = useRouter();

  const [rating, setRating] = useState(1);
  const [ratingHover, setRatingHover] = useState(0);
  const [success, setSuccess] = useState(true);
  const [level, setLevel] = useState(0);
  const [levelHover, setLevelHover] = useState(0);
  const [fear, setFear] = useState(0);
  const [fearHover, setFearHover] = useState(0);
  const [activity, setActivity] = useState(0);
  const [activityHover, setActivityHover] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const mutation = useMutation(
    (data: IWriteReviewOnThemeProps) => api.themes.writeReviewOnTheme(data),
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

    mutation.mutate({ id, rating, success, level, fear, activity, text });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box mb="24px">
        <Label required>성공여부</Label>
        <Box flexDirection="row" justifyContent="space-evenly">
          <Button
            type="button"
            kind={success ? 'primary' : 'default'}
            size="small"
            width="100px"
            onClick={() => setSuccess(true)}
          >
            성공
          </Button>
          <Button
            type="button"
            kind={!success ? 'primary' : 'default'}
            size="small"
            width="100px"
            onClick={() => setSuccess(false)}
          >
            실패
          </Button>
        </Box>
      </Box>

      <BorderBox>
        <Label required>테마 평점</Label>
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

      <BorderBox>
        <Label>체감 난이도</Label>
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                type="button"
                onClick={() => setLevel(index)}
                onMouseEnter={() => setLevelHover(index)}
                onMouseLeave={() => setLevelHover(level)}
              >
                <img
                  key={index}
                  src={
                    index <= (levelHover || level)
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

      <BorderBox>
        <Label>활동성</Label>
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                type="button"
                onClick={() => setActivity(index)}
                onMouseEnter={() => setActivityHover(index)}
                onMouseLeave={() => setActivityHover(activity)}
              >
                <img
                  key={index}
                  src={
                    index <= (activityHover || activity)
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

      <BorderBox>
        <Label>공포도</Label>
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                type="button"
                onClick={() => setFear(index)}
                onMouseEnter={() => setFearHover(index)}
                onMouseLeave={() => setFearHover(fear)}
              >
                <img
                  key={index}
                  src={
                    index <= (fearHover || fear) ? iconStarYellow : iconStarGrey
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
  background-color: rgb(var(--content));
  resize: none;
`;

export default CreateThemeReview;
