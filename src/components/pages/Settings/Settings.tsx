import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import api from 'api';
import { revertAll, useAppDispatch } from 'store';
import { logout } from 'store/authSlice';
import { Box, Text } from 'components/atoms';
import iconProfileCircle from 'assets/icons/profile-circle.svg';
import iconLockGrey from 'assets/icons/lock-grey.svg';
import iconMessageCircle from 'assets/icons/message-circle.svg';
import iconQuestionMark from 'assets/icons/question-mark.svg';
import iconDocs from 'assets/icons/docs.svg';
import iconLogout from 'assets/icons/logout.svg';
import iconChevronRight from 'assets/icons/chevron-right.svg';

const Settings = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    await api.auth.logout();
    dispatch(logout());
    dispatch(revertAll());
    router.push('/');
  }

  return (
    <>
      <Box>
        <Title>계정</Title>
        <Items>
          <Link href="/accounts/edit" passHref>
            <Item>
              <ImageBox>
                <img
                  src={iconProfileCircle}
                  alt="update-profile"
                  width="24px"
                  height="24px"
                />
              </ImageBox>
              프로필 수정
            </Item>
          </Link>
          <Link href="/accounts/password/change" passHref>
            <Item>
              <ImageBox>
                <img
                  src={iconLockGrey}
                  alt="change-password"
                  width="24px"
                  height="24px"
                />
              </ImageBox>
              비밀번호 변경
            </Item>
          </Link>
        </Items>
      </Box>

      <Box>
        <Title>고객센터</Title>
        <Items>
          <Link href="/faq" passHref>
            <Item>
              <ImageBox>
                <img
                  src={iconQuestionMark}
                  alt="faq"
                  width="24px"
                  height="24px"
                />
              </ImageBox>
              자주묻는질문
            </Item>
          </Link>
          <Link href="/terms" passHref>
            <Item>
              <ImageBox>
                <img src={iconDocs} alt="terms" width="24px" height="24px" />
              </ImageBox>
              이용약관
            </Item>
          </Link>
          <Link href="/privacy" passHref>
            <Item>
              <ImageBox>
                <img src={iconDocs} alt="privacy" width="24px" height="24px" />
              </ImageBox>
              개인정보 처리방침
            </Item>
          </Link>
          <Item href="mailto:escapenote.team@gmail.com">
            <ImageBox>
              <img
                src={iconMessageCircle}
                alt="contact-us"
                width="24px"
                height="24px"
              />
            </ImageBox>
            문의하기
          </Item>
        </Items>
      </Box>

      <Box>
        <Items>
          <Item role="button" onClick={handleLogout}>
            <ImageBox>
              <img src={iconLogout} alt="logout" width="24px" height="24px" />
            </ImageBox>
            <Text color="rgb(var(--error))">로그아웃</Text>
          </Item>
        </Items>
      </Box>
    </>
  );
};

const Title = styled.strong`
  margin-bottom: 16px;
  font-weight: 700;
  color: rgb(var(--greyscale400));
`;
const Items = styled.div`
  margin-bottom: 24px;
`;
const Item = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 16px;
  padding: 12px;
  height: 64px;
  background-color: rgb(var(--background));
  font-weight: 700;
  :last-of-type {
    margin-bottom: 0;
  }
  ::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 12px;
    display: inline;
    width: 24px;
    height: 24px;
    background-image: url(${iconChevronRight});
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  background-color: rgb(var(--content));
  box-shadow: 0px 4px 32px rgba(107, 114, 128, 0.02);
  /* body[data-theme='light'] & {
    background-color: rgb(var(--primary100));
  }
  body[data-theme='dark'] & {
    background-color: rgb(var(--greyscale700));
  } */
`;

export default Settings;
