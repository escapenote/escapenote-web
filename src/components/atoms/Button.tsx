import styled from '@emotion/styled';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

interface IProps extends SpaceProps, LayoutProps {}
const Button = styled.button<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgb(var(--border));
  padding: 0 10px;
  width: auto;
  height: 42px;
  background-color: rgb(var(--content));
  font-weight: bold;
  text-align: center;
  color: rgb(var(--text));
  cursor: pointer;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  transition: 150ms;
  :disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
  ${space};
  ${layout};
`;

export default Button;
