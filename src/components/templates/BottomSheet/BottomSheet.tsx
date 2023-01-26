import styled from '@emotion/styled';
import Sheet from 'react-modal-sheet';

import { Box } from 'components/atoms';
import closeIcon from 'assets/icons/close.svg';

const ModalSheet = Sheet as any;

interface IProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onFinish?: () => void;
}
const BottomSheet: React.FC<IProps> = ({
  children,
  title,
  isOpen,
  onClose,
  onFinish,
}) => {
  function handleOpenEnd() {
    document.body.style.overflow = 'hidden';
  }

  function handleCloseStart() {
    document.body.style.overflow = 'auto';
  }
  return (
    <ModalSheet
      isOpen={isOpen}
      disableDrag={true}
      onClose={onClose}
      onOpenEnd={handleOpenEnd}
      onCloseStart={handleCloseStart}
    >
      <ModalSheet.Container>
        <HeadingContainer>
          <Box width="24px" />
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="close" width="24px" height="24px" />
          </CloseButton>
        </HeadingContainer>
        <ModalSheet.Content>
          <BodyContainer>{children}</BodyContainer>
        </ModalSheet.Content>
        <ModalSheetFooter>
          <Box />
          <ApplyButton onClick={onFinish}>동의</ApplyButton>
        </ModalSheetFooter>
      </ModalSheet.Container>

      <ModalSheet.Backdrop />
    </ModalSheet>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  width: 100%;
  border-bottom: 1px solid rgb(var(--border));
`;
const Title = styled.strong`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const CloseButton = styled.button``;
const BodyContainer = styled.div`
  padding: 24px;
  overflow: scroll;
`;
const ModalSheetFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(var(--border));
  padding: 16px 24px;
`;
const UnFilter = styled.button`
  font-size: 14px;
  color: rgb(var(--greyscale500));
  text-decoration: underline;
`;
const ApplyButton = styled.button`
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

export default BottomSheet;
