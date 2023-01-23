import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ICafe } from 'types';
import { Box } from 'components/atoms';
import iconCafeThumbnail from 'assets/icons/cafe-thumbnail.svg';
import CafeThemes from './CafeThemes';
import CafeInfo from './CafeInfo';

interface IProps {
  id: string;
  cafe?: ICafe;
}
const CafeDetail: React.FC<IProps> = ({ id, cafe }) => {
  const [tab, setTab] = useState('themes');

  function handleChangeTab(activeTab: string) {
    setTab(activeTab);
  }

  return (
    <Wrapper>
      <Box alignItems="center" mb="32px">
        {cafe && cafe.images.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cafe.images[0]}`}
            alt={cafe.name}
          />
        ) : (
          <Image src={iconCafeThumbnail} alt={cafe?.name} />
        )}
        <Name>{cafe?.name}</Name>
        <Location>
          {cafe?.areaA} {cafe?.areaB}
        </Location>
      </Box>

      <Tabs>
        <Tab
          active={tab === 'themes'}
          onClick={() => handleChangeTab('themes')}
        >
          테마 ({cafe?.themes.length})
        </Tab>
        <Tab active={tab === 'info'} onClick={() => handleChangeTab('info')}>
          기본정보
        </Tab>
      </Tabs>

      {tab === 'themes' && <CafeThemes cafeId={id} />}
      {tab === 'info' && <CafeInfo cafe={cafe} />}

      <Footer>
        <FooterContainer>
          <TelLink href={`tel:${cafe?.tel}}`}>전화하기</TelLink>
          <SiteLink href={cafe?.website} target="_blank">
            홈페이지
          </SiteLink>
        </FooterContainer>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 72px;
`;
const Image = styled.img`
  margin-bottom: 12px;
  border-radius: 50px;
  border: 8px solid white;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 40px rgba(17, 24, 39, 0.06);
`;
const Name = styled.strong`
  margin-bottom: 2px;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
`;
const Location = styled.span`
  font-size: 12px;
  color: rgb(var(--greyscale400));
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
`;
const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 1.5px solid transparent;
  border-color: rgb(var(--border));
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--greyscale400));
  cursor: pointer;
  ${p =>
    p.active &&
    css`
      border-color: rgb(var(--primary));
      font-weight: 700;
      color: rgb(var(--primary));
    `}
`;
const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgb(var(--border));
  height: 72px;
  min-height: calc(72px + env(safe-area-inset-bottom));
  background-color: rgb(var(--content));
  z-index: 999;
  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 480px;
  }
`;
const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
`;
const TelLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  border-radius: 16px;
  border: 1px solid rgb(var(--border));
  padding: 16px;
  width: calc(50% - 9px);
  height: 56px;
  background-color: rgb(var(--content));
  font-size: 14px;
  font-weight: 700;
`;
const SiteLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  width: calc(50% - 9px);
  height: 56px;
  background-color: rgb(var(--primary));
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export default CafeDetail;
