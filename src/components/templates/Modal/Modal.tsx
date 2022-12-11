import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

interface IProps {
  open: boolean;
  children: React.ReactNode;
  onCancel: () => void;
}
const Modal: React.FC<IProps> = ({ open, children, onCancel }) => {
  const el = document.getElementById('modal') as HTMLDivElement;
  return (
    <>
      {ReactDOM.createPortal(
        <Wrapper open={open}>
          <Background onClick={onCancel} />
          <Center>{children}</Center>
        </Wrapper>,
        el,
      )}
    </>
  );
};

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${p => (p.open ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  z-index: 9000;
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(34, 34, 34, 0.8);
  user-select: none;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Modal;
