import React from 'react';
import styled from '@emotion/styled';

interface IProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  ref?: React.ForwardedRef<HTMLDivElement>;
  children: React.ReactNode;
}
const NoXAxisScrollBar: React.FC<IProps> = React.forwardRef(
  ({ children }, ref, ...props) => (
    <Wrapper>
      <Container ref={ref} {...props}>
        {children}
      </Container>
    </Wrapper>
  ),
);

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -15px;
  padding-bottom: 15px;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -ms-overflow-style: none;
`;

export default NoXAxisScrollBar;
