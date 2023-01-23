import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { IUser } from 'types';
import api from 'api';
import { useAppDispatch } from 'store';
import { logout } from 'store/authSlice';
import Layout from 'components/templates/Layout';
import { Box } from 'components/atoms';
import iconSettings from 'assets/icons/settings.svg';
import iconAvatar from 'assets/icons/avatar.svg';

interface IProps {
  user?: IUser;
}
const PrivateProfile: React.FC<IProps> = ({ user }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    await api.auth.logout();
    dispatch(logout());
    router.push('/');
  }

  return (
    <Layout
      title="프로필"
      leftAction={<></>}
      rightAction={
        <button onClick={() => router.push('/accounts/settings')}>
          <img src={iconSettings} alt="settings" width="24px" height="24px" />
        </button>
      }
    >
      <Container>
        <Background len={user?.type.length ?? 0}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 20 }).map((_, j) => (
                <Type key={j}>{user?.type} </Type>
              ))}
            </div>
          ))}
        </Background>

        <Box mt="-60px" mb="18px">
          <AvatarCircle>
            <img src={iconAvatar} alt="avatar" width="68px" height="68px" />
          </AvatarCircle>
        </Box>

        <Box mb="4px">
          <Nickname>{user?.nickname}</Nickname>
        </Box>

        <Box mb="48px">
          <Email>{user?.email}</Email>
        </Box>

        <Box mb="24px">
          <EditProfileButton onClick={() => router.push('/accounts/edit')}>
            프로필 수정
          </EditProfileButton>
        </Box>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div<{ len: number }>`
  position: relative;
  margin: -16px;
  height: 190px;
  overflow: hidden;
  > div {
    display: flex;
    flex-wrap: nowrap;
    :nth-of-type(2n + 1) {
      margin: 0 ${p => (p.len === 2 ? '-20px' : '-40px')};
    }
  }
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) -7.95%,
      #ffffff 97.22%
    );
  }
`;
const Type = styled.span`
  display: inline-block;
  padding: 0 5px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: rgb(var(--greyscale300));
  white-space: nowrap;
`;
const AvatarCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: rgb(var(--greyscale50));
  z-index: 1;
`;
const Nickname = styled.strong`
  font-size: 18px;
  font-weight: 500;
`;
const Email = styled.span`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const EditProfileButton = styled.button`
  border-radius: 10px;
  padding: 7px 15px;
  background-color: rgb(var(--greyscale200));
  font-size: 16px;
`;

export default PrivateProfile;
