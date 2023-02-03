import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { IUpdateProfileProps } from 'api/auth';
import { readUrl } from 'utils/common';
import { signupSchema } from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { editProfile } from 'store/authSlice';
import { setImportImageFile } from 'store/imageSlice';
import { Box, Input, Select, Button } from 'components/atoms';
import iconAvatar from 'assets/icons/avatar.svg';
import iconCamera from 'assets/icons/camera.svg';
import iconUser from 'assets/icons/user.svg';
import iconStar from 'assets/icons/star.svg';

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const exportedImageFile = useAppSelector(
    state => state.image.exportedImageFile,
  );

  const [imageUrl, setImageUrl] = useState(
    user?.avatar ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.avatar}` : '',
  );
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [type, setType] = useState(user?.type ?? '');
  const [submitting, setSubmitting] = useState(false);

  const mutation = useMutation(
    (data: IUpdateProfileProps) => api.auth.updateProfile(data),
    {
      onSuccess: ({ data }) => {
        dispatch(editProfile(data));
        alert('프로필이 수정되었습니다.');
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

  useEffect(() => {
    if (exportedImageFile) {
      (async () => {
        const url = await readUrl(exportedImageFile);
        setImageUrl(url);
      })();
    }
  }, [exportedImageFile]);

  async function handleFileChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target.files;
    if (files !== null && files.length > 0) {
      const file = files[0];
      dispatch(
        setImportImageFile({ importType: 'user', importedImageFile: file }),
      );
      router.push('/create/image');
    }
  }

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

    if (exportedImageFile) {
      const { url } = await api.images.uploadImageForUser(exportedImageFile);
      mutation.mutate({ avatar: url, nickname, type });
    } else {
      mutation.mutate({ nickname, type });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box alignItems="center" mt="12px" mb="36px">
        <ImageItem background={iconAvatar}>
          <UploadGuideImage type="button">
            <img src={iconCamera} alt="camera" width="14px" height="14px" />
          </UploadGuideImage>
          {imageUrl && (
            <UploadImage src={imageUrl} width="100px" height="100px" />
          )}
          <ImageInput
            id="files"
            name="files"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileChanged}
          />
        </ImageItem>
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
const ImageItem = styled.div<{ background: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 4px solid #fff;
  width: 100px;
  height: 100px;
  background-image: url('${p => p.background}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 64px 64px;
  box-shadow: 4px 16px 50px rgba(107, 114, 128, 0.12);
  overflow: hidden;
  z-index: 1;
`;
const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;
const UploadImage = styled.img`
  border-radius: 50%;
`;
const UploadGuideImage = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: rgba(17, 24, 39, 0.1);
  backdrop-filter: blur(2px);
`;
const Label = styled.label`
  margin-bottom: 16px;
  font-weight: 700;
  color: rgb(var(--greyscale400));
`;

export default EditProfile;
