import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { IUpdateProfileProps } from 'api/auth';
import { signupSchema } from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { editProfile } from 'store/authSlice';
import { Box, Input, Select, Button } from 'components/atoms';
import iconAvatar from 'assets/icons/avatar.svg';
import iconUser from 'assets/icons/user.svg';
import iconStar from 'assets/icons/star.svg';

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [type, setType] = useState(user?.type ?? '');
  const [submitting, setSubmitting] = useState(false);

  const mutation = useMutation(
    (data: IUpdateProfileProps) => api.auth.updateProfile(data),
    {
      onSuccess: ({ data }) => {
        dispatch(editProfile(data));
        alert('성공적으로 프로필 수정 완료하였습니다.');
        setSubmitting(false);
        return router.push(`/users/${data?.nickname}`);
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

    // Validate nickname
    try {
      await signupSchema.nickname.validate(nickname);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    // Check for duplicated nickname
    if (user?.nickname !== nickname) {
      try {
        await api.auth.checkForDuplicateNickname({ nickname });
      } catch (e: any) {
        setSubmitting(false);
        alert(e.response.data.detail);
        return;
      }
    }

    mutation.mutate({ nickname, type });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box alignItems="center" mt="12px" mb="36px">
        <AvatarCircle>
          <img src={iconAvatar} alt="avatar" width="68px" height="68px" />
        </AvatarCircle>
      </Box>

      <Box mb="24px">
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임(2-12자 이내, 한글/영소문자/숫자)"
          auto-apitalize="off"
          maxLength={12}
          value={nickname}
          prefixIcon={
            <img src={iconUser} alt="user" width="20px" height="20px" />
          }
          onChange={e => setNickname(e.target.value)}
        />
      </Box>

      <Box mb="24px">
        <Label>방탈출 성향</Label>
        <Select
          placeholder="방탈출 성향"
          defaultValue={type}
          value={type}
          prefixIcon={
            <img src={iconStar} alt="star" width="20px" height="20px" />
          }
          onChange={(e: any) => setType(e.target.value)}
        >
          <option value="탱">탱</option>
          <option value="쫄탱">쫄탱</option>
          <option value="마지모탱">마지모탱</option>
          <option value="변쫄">변쫄</option>
          <option value="쫄">쫄</option>
          <option value="극쫄">극쫄</option>
        </Select>
      </Box>

      <Box mt="auto">
        <Button
          type="submit"
          kind="default"
          disabled={!nickname || !type || submitting}
        >
          {submitting ? '로딩중...' : '저장'}
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
const AvatarCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: rgb(var(--greyscale50));
`;
const Label = styled.label`
  margin-bottom: 16px;
  font-weight: 700;
  color: rgb(var(--greyscale400));
`;

export default EditProfile;
