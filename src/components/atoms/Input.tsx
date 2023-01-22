import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}
const Input: React.FC<IProps> = ({ prefixIcon, suffixIcon, ...props }) => {
  return (
    <Container>
      {prefixIcon && <PrefixIcon>{prefixIcon}</PrefixIcon>}
      <StyledInput
        isPrefixIcon={Boolean(prefixIcon)}
        isSuffixIcon={Boolean(suffixIcon)}
        {...props}
      />
      {suffixIcon && <SuffixIcon>{suffixIcon}</SuffixIcon>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const PrefixIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 12px 18px 20px;
`;
const SuffixIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 18px 20px 18px 12px;
`;
const StyledInput = styled.input<{
  isPrefixIcon: boolean;
  isSuffixIcon: boolean;
}>`
  background: 0 0;
  border-radius: 16px;
  border: 1px solid transparent;
  padding: 20px;
  width: 100%;
  height: 56px;
  background-color: rgb(var(--greyscale50));
  color: rgb(var(--text));
  transition: 150ms;
  ::placeholder {
    color: rgb(var(--greyscale400));
  }
  :focus {
    border-color: rgb(var(--primary));
    outline: 0;
  }
  ${p =>
    p.isPrefixIcon &&
    css`
      padding-left: 52px;
    `}
  ${p =>
    p.isSuffixIcon &&
    css`
      padding-right: 52px;
    `}
`;

export default Input;
