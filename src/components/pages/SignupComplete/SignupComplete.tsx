import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';

import api from 'api';
import { ISignupByEmailProps } from 'api/auth';
import { readUrl } from 'utils/common';
import { signupSchema } from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { resetImageFile, setImportImageFile } from 'store/imageSlice';
import { login } from 'store/authSlice';
import { Box, Input, Button, Select } from 'components/atoms';
import iconAvatar from 'assets/icons/avatar.svg';
import iconCamera from 'assets/icons/camera.svg';
import iconUser from 'assets/icons/user.svg';
import iconStar from 'assets/icons/star.svg';
import iconPassword from 'assets/icons/password.svg';
import iconEyeOff from 'assets/icons/eye-off.svg';
import iconEye from 'assets/icons/eye.svg';

const SignupComplete: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    agreeOlder14Years,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
    email,
    code,
  } = useAppSelector(state => state.signup);
  const exportedImageFile = useAppSelector(
    state => state.image.exportedImageFile,
  );

  const [imageUrl, setImageUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [submitting, setSubmitting] = useState(false);

  const signupByEmail = useMutation(
    (data: ISignupByEmailProps) => api.auth.signupByEmail(data),
    {
      onSuccess: ({ data }) => {
        dispatch(login(data));
        alert('회원가입 완료! 이스케이프 노트의 다양한 서비스를 즐겨보세요 😎');
        router.push('/');
        setSubmitting(false);
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  useEffect(() => {
    if (!agreeOlder14Years || !agreeTerms || !agreePrivacy) {
      router.replace('/accounts/signup/intro');
    } else if (!email) {
      router.replace('/accounts/signup/email');
    } else if (!code) {
      router.replace('/accounts/signup/confirm');
    }
  }, [router, agreeOlder14Years, agreeTerms, agreePrivacy, email, code]);

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
      dispatch(resetImageFile());
      dispatch(
        setImportImageFile({ importType: 'user', importedImageFile: file }),
      );
      router.push('/create/image');
    }
  }

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'nickname') setNickname(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  }

  function handleTogglePasswordType() {
    setPasswordType(prev => {
      if (prev === 'password') return 'text';
      else return 'password';
    });
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (password !== confirmPassword) {
      setSubmitting(false);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signupSchema.nickname.validate(nickname);
      await signupSchema.password.validate(password);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    // check for duplicated nickname
    try {
      await api.auth.checkForDuplicateNickname({ nickname });
    } catch (e: any) {
      setSubmitting(false);
      alert(e.response.data.detail);
      return;
    }

    const data = {
      email,
      password,
      code,
      nickname,
      type,
      agreeOlder14Years,
      agreeTerms,
      agreePrivacy,
      agreeMarketing,
    } as ISignupByEmailProps;
    if (exportedImageFile) {
      const { url } = await api.images.uploadImageForUser(exportedImageFile);
      data.avatar = url;
    }
    signupByEmail.mutate(data);
  }

  return (
    <Box flex="1">
      <Box mb="40px">
        <Title>마지막 단계입니다</Title>
        <Desc>
          닉네임과 비밀번호
          <br />
          그리고 방탈출 성향을 설정해주세요.
        </Desc>
      </Box>

      <Form onSubmit={handleSignup}>
        <Box alignItems="center" mb="40px">
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
        <Box mb="16px">
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
            onChange={handleChangeState}
          />
        </Box>
        <Box mb="16px">
          <Select
            placeholder="방탈출 성향"
            value={type}
            prefixIcon={
              <img src={iconStar} alt="star" width="20px" height="20px" />
            }
            onChange={(e: any) => setType(e.target.value)}
          >
            <option value="">방탈출 성향을 선택해주세요</option>
            <option value="탱">탱</option>
            <option value="쫄탱">쫄탱</option>
            <option value="마지모탱">마지모탱</option>
            <option value="변쫄">변쫄</option>
            <option value="쫄">쫄</option>
            <option value="극쫄">극쫄</option>
          </Select>
        </Box>
        <Box mb="16px">
          <Input
            type={passwordType}
            name="password"
            placeholder="비밀번호(8자 이상 문자/숫자/기호)"
            maxLength={20}
            value={password}
            prefixIcon={
              <img
                src={iconPassword}
                alt="password"
                width="20px"
                height="20px"
              />
            }
            suffixIcon={
              <button type="button" onClick={handleTogglePasswordType}>
                <img
                  src={passwordType === 'password' ? iconEyeOff : iconEye}
                  alt="eyes-off"
                  width="20px"
                  height="20px"
                />
              </button>
            }
            onChange={handleChangeState}
          />
        </Box>
        <Box mb="24px">
          <Input
            type={passwordType}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            maxLength={20}
            value={confirmPassword}
            prefixIcon={
              <img
                src={iconPassword}
                alt="password"
                width="20px"
                height="20px"
              />
            }
            suffixIcon={
              <button type="button" onClick={handleTogglePasswordType}>
                <img
                  src={passwordType === 'password' ? iconEyeOff : iconEye}
                  alt="eyes-off"
                  width="20px"
                  height="20px"
                />
              </button>
            }
            onChange={handleChangeState}
          />
        </Box>

        <Box mt="auto">
          <Button
            type="submit"
            kind="primary"
            disabled={
              !nickname || !type || !password || !confirmPassword || submitting
            }
          >
            {submitting ? '로딩중...' : '가입하기'}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;
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
  cursor: pointer;
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

export default SignupComplete;
