import styled from '@emotion/styled';

const Input = styled.input`
  background: 0 0;
  border: 1px solid rgb(var(--border));
  border-radius: 8px;
  padding: 0 10px;
  height: 42px;
  background-color: rgb(var(--content));
  color: rgb(var(--text));
  transition: 150ms;
  :focus {
    border-color: rgb(var(--contentR));
    outline: 0;
  }
`;
export default Input;
