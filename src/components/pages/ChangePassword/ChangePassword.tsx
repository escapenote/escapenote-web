import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';

import api from 'api';
import { IChangePasswordProps } from 'api/auth';
import { signupSchema } from 'utils/validators';
import { Box, Input, Button } from 'components/atoms';
import iconPassword from 'assets/icons/password.svg';
import iconEyeOff from 'assets/icons/eye-off.svg';
import iconEye from 'assets/icons/eye.svg';

const ChangePassword: React.FC = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [submitting, setSubmitting] = useState(false);

  const mutation = useMutation(
    (data: IChangePasswordProps) => api.auth.changePassword(data),
    {
      onSuccess: () => {
        alert('비밀번호 변경 완료하였습니다.');
        router.back();
        setSubmitting(false);
      },
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
        setSubmitting(false);
      },
    },
  );

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
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

    if (newPassword !== confirmNewPassword) {
      setSubmitting(false);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signupSchema.password.validate(newPassword);
    } catch (e: any) {
      setSubmitting(false);
      alert(e.message);
      return;
    }

    mutation.mutate({ oldPassword, newPassword });
  }

  return (
    <Box flex="1">
      <Form onSubmit={handleSignup}>
        <Box mb="24px">
          <Label>현재 비밀번호</Label>
          <Input
            type={passwordType}
            name="oldPassword"
            placeholder="현재 비밀번호"
            maxLength={20}
            value={oldPassword}
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

        <Box mb="16px">
          <Label>새로운 비밀번호</Label>
          <Input
            type={passwordType}
            name="newPassword"
            placeholder="비밀번호(8자 이상 문자/숫자/기호)"
            maxLength={20}
            value={newPassword}
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
            name="confirmNewPassword"
            placeholder="비밀번호 확인"
            maxLength={20}
            value={confirmNewPassword}
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
            kind="default"
            disabled={
              !oldPassword || !newPassword || !confirmNewPassword || submitting
            }
          >
            {submitting ? '로딩중...' : '저장'}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 8px;
`;
const Label = styled.label`
  margin-bottom: 16px;
  font-weight: 700;
  color: rgb(var(--greyscale400));
`;

export default ChangePassword;
