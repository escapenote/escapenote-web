import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IUser } from 'types';
import { obscureEmail } from 'utils/common';
import Layout from 'components/templates/Layout';
import { Box } from 'components/atoms';
import iconAvatar from 'assets/icons/avatar.svg';

interface IProps {
  user?: IUser;
}
const PublicProfile: React.FC<IProps> = ({ user }) => {
  const getSuccesPercent = () => {
    if (user) {
      const totalCount = user.themeReviews.length;
      const successReviews = user.themeReviews.filter(v => v.success);
      const successCount = successReviews.length;
      return Math.round((successCount / totalCount) * 100);
    }
    return 0;
  };

  const getTotalReviewsCount = () => {
    if (user) {
      const cafeReviewsCount = user.cafeReviews.length;
      const themeReviewsCount = user.themeReviews.length;
      return cafeReviewsCount + themeReviewsCount;
    }
    return 0;
  };

  return (
    <Layout title="프로필" leftAction={<></>} rightAction={<></>}>
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

        <Box mt="-60px" mb="8px">
          <AvatarCircle>
            {user?.avatar ? (
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user.avatar}`}
                alt={user.nickname}
                width="92px"
                height="92px"
              />
            ) : (
              <img src={iconAvatar} alt="avatar" width="68px" height="68px" />
            )}
          </AvatarCircle>
        </Box>

        <Box mb="8px">
          <Nickname>{user?.nickname}</Nickname>
        </Box>

        <Box mb="24px">
          <Email>{obscureEmail(user?.email ?? '')}</Email>
        </Box>

        <Metas>
          <Meta>
            <MetaValue>{user?.type}</MetaValue>
            <MetaLabel>방탈출 성향</MetaLabel>
          </Meta>
          <Meta>
            <MetaValue>{getSuccesPercent()}%</MetaValue>
            <MetaLabel>탈출 성공률</MetaLabel>
          </Meta>
          <Meta>
            <MetaValue primary>{getTotalReviewsCount()}</MetaValue>
            <MetaLabel>리뷰 작성수</MetaLabel>
          </Meta>
        </Metas>
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
  border: 4px solid rgb(var(--greyscale50));
  width: 100px;
  height: 100px;
  background-color: rgb(var(--greyscale50));
  z-index: 1;
  > img {
    border-radius: 100px;
  }
`;
const Nickname = styled.strong`
  font-size: 18px;
  font-weight: 700;
`;
const Email = styled.span`
  font-size: 14px;
  color: rgb(var(--greyscale400));
`;
const Metas = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 16px;
  border: 1px solid rgb(var(--greyscale200));
  padding: 7px 16px;
  width: 100%;
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MetaLabel = styled.span`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const MetaValue = styled.strong<{ primary?: boolean }>`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: 700;
  ${p =>
    p.primary &&
    css`
      color: rgb(var(--primary));
    `}
`;

export default PublicProfile;
