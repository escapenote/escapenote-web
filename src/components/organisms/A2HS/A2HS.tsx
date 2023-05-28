import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';

import { Box } from 'components/atoms';
import iconShare from 'assets/icons/home-share.svg';
import iconClose from 'assets/icons/a2hs-close.svg';

const useA2HS = () => {
  const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    function isIOS() {
      const userAgent = window.navigator.userAgent;
      return /iPad|iPhone|iPod/.test(userAgent);
    }

    function isSafari() {
      const userAgent = window.navigator.userAgent;
      const isSafari = /^((?!chrome|android|crios).)*safari/i.test(userAgent);
      const isChrome = /CriOS/.test(userAgent);
      const isEdge = /Edg\//.test(userAgent);

      return isSafari && !isChrome && !isEdge;
    }

    function isIOSSafari() {
      return isIOS() && isSafari();
    }

    const isInStandaloneMode = () =>
      'standalone' in window.navigator && (window.navigator as any).standalone;

    const storedA2hs = Cookies.get('a2hs');
    if (storedA2hs !== 'close') {
      if (isIOSSafari() && !isInStandaloneMode()) {
        setShowInstallMessage(true);
      }
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = () => {
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then(() => {
      clearPrompt();
    });
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  const closeInstallMessage = () => {
    setShowInstallMessage(false);
    setCookieA2hs();
  };

  const setCookieA2hs = () => {
    Cookies.set('a2hs', 'close', { expires: 365 });
  };

  return {
    showInstallMessage,
    deferredPrompt,
    installApp,
    clearPrompt,
    closeInstallMessage,
  };
};

const A2HS = () => {
  const {
    showInstallMessage,
    deferredPrompt,
    installApp,
    clearPrompt,
    closeInstallMessage,
  } = useA2HS();

  if (deferredPrompt) {
    return (
      <Container>
        <Box flexDirection="row" alignItems="center" mb="24px">
          <AppIcon
            src={`${process.env.NEXT_PUBLIC_URL}/icons/apple-icon-120x120.png`}
            alt="이스케이프노트"
          />
          <Title>
            이스케이프노트 바로가기를
            <br />
            추가하시겠습니까?
          </Title>
        </Box>
        <Box flexDirection="row" justifyContent="flex-end">
          <CancelButton onClick={clearPrompt}>취소</CancelButton>
          <Box width="16px" />
          <AddButton onClick={installApp}>추가하기</AddButton>
        </Box>
      </Container>
    );
  }

  return showInstallMessage ? (
    <RadiusContainer>
      <AppIconMini
        src={`${process.env.NEXT_PUBLIC_URL}/icons/apple-icon-120x120.png`}
        alt="NomadTerrace"
      />
      <span>
        iPhone에 이 웹 앱을 설치합니다.
        <img src={iconShare} alt="share" width="20px" height="22px" />을 누른
        다음 홈 화면에 추가하세요!
      </span>
      <CloseButton onClick={closeInstallMessage}>
        <img
          className="invert-reverse"
          src={iconClose}
          alt="close"
          width="16px"
          height="16px"
        />
      </CloseButton>
    </RadiusContainer>
  ) : null;
};

const Container = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 24px;
  max-height: 300px;
  box-shadow: 0 0 56px rgba(0, 0, 0, 0.2);
  background-color: rgb(var(--hover));
  white-space: pre-wrap;
  @media screen and (max-width: 1024px) {
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px 16px 0 0;
  }
`;
const RadiusContainer = styled(Container)`
  @media screen and (max-width: 1024px) {
    flex-direction: row;
    align-items: center;
    left: 16px;
    right: 16px;
    bottom: 24px;
    border-radius: 16px;
    border: 1px solid rgb(var(--border));
    padding: 16px;
    line-height: 20px;
    ::after {
      content: '';
      position: absolute;
      left: calc(50% - 10px);
      bottom: -10px;
      border-bottom: 1px solid rgb(var(--border));
      border-right: 1px solid rgb(var(--border));
      width: 20px;
      height: 20px;
      background-color: rgb(var(--hover));
      transform: rotate(45deg);
      z-index: 999;
    }
  }
`;
const AppIcon = styled.img`
  margin-right: 16px;
  border-radius: 16px;
  width: 56px;
  height: 56px;
`;
const AppIconMini = styled.img`
  margin-right: 8px;
  border-radius: 8px;
  width: 40px;
  height: 40px;
`;
const Title = styled.strong`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;
const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
`;
const CancelButton = styled(ActionButton)`
  color: rgb(var(--grey));
`;
const AddButton = styled(ActionButton)`
  color: rgb(var(--primary));
`;
const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background-color: rgb(var(--contentR));
`;

export default A2HS;
