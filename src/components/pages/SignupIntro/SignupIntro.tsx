import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useAppDispatch } from 'store';
import { setSignupAgree } from 'store/signupSlice';
import Terms from 'components/pages/Terms';
import Privacy from 'components/pages/Privacy';
import BottomSheet from 'components/templates/BottomSheet';
import { Box, Button, Checkbox, Text } from 'components/atoms';

const SignupIntro = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeOlder14Years, setAgreeOlder14Years] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      setSignupAgree({
        agreeOlder14Years,
        agreeTerms,
        agreePrivacy,
        agreeMarketing,
      }),
    );
    setSubmitting(true);
    router.push('/accounts/signup/email');
  }

  function handleAgreeAll(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreeOlder14Years(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  }

  return (
    <>
      <Box flex="1">
        <Box>
          <Title>회원가입</Title>
        </Box>

        <Box mb="188px">
          <Desc>ESCAPE NOTE 가입을 환영합니다!</Desc>
        </Box>

        <Form onSubmit={handleSubmit}>
          <Box mb="24px">
            <Box flexDirection="row" alignItems="center">
              <Checkbox
                name="agreeAll"
                checked={agreeAll}
                onChange={handleAgreeAll}
              />
              <Text fontWeight="700">약관 전체 동의</Text>
            </Box>
            <Line />
            <Box flexDirection="row" alignItems="center" mb="12px">
              <Checkbox
                name="agreeOlder14Years"
                checked={agreeOlder14Years}
                onChange={e => setAgreeOlder14Years(e.target.checked)}
              />
              (필수) 만 14세 이상입니다.
            </Box>
            <Box flexDirection="row" alignItems="center" mb="12px">
              <Checkbox
                name="agreeTerms"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
              />
              (필수)&nbsp;
              <span className="link" onClick={() => setOpenTerms(true)}>
                이용약관
              </span>
              &nbsp;동의
            </Box>
            <Box flexDirection="row" alignItems="center" mb="12px">
              <Checkbox
                name="agreePrivacy"
                checked={agreePrivacy}
                onChange={e => setAgreePrivacy(e.target.checked)}
              />
              (필수)&nbsp;
              <span className="link" onClick={() => setOpenPrivacy(true)}>
                개인정보 수집 및 이용
              </span>
              &nbsp;동의
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Checkbox
                name="agreeMarketing"
                checked={agreeMarketing}
                onChange={e => setAgreeMarketing(e.target.checked)}
              />
              (선택) E-mail 광고성 정보 수신 동의
            </Box>
          </Box>

          <Box mt="auto">
            <Button
              type="submit"
              kind="primary"
              disabled={
                !agreeOlder14Years || !agreeTerms || !agreePrivacy || submitting
              }
            >
              {submitting ? '로딩중...' : '다음'}
            </Button>
          </Box>
        </Form>
      </Box>

      <BottomSheet
        title="이용 약관"
        isOpen={openTerms}
        onClose={() => setOpenTerms(false)}
        onFinish={() => {
          setOpenTerms(false);
          setAgreeTerms(true);
        }}
      >
        <Terms />
      </BottomSheet>

      <BottomSheet
        title="개인정보 처리방침"
        isOpen={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        onFinish={() => {
          setOpenPrivacy(false);
          setAgreePrivacy(true);
        }}
      >
        <Privacy />
      </BottomSheet>
    </>
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
const Line = styled.div`
  margin: 12px -24px;
  height: 1px;
  background-color: rgb(var(--greyscale300));
`;

export default SignupIntro;
