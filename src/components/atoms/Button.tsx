import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

type ButtonType = 'primary' | 'default' | 'text';
type ButtonSize = 'small' | 'default';

interface IProps extends SpaceProps, LayoutProps {
  kind?: ButtonType;
  size?: ButtonSize;
}
const Button = styled.button<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid rgb(var(--primary));
  padding: 16px;
  width: auto;
  height: 56px;
  background-color: rgb(var(--content));
  font-weight: 500;
  text-align: center;
  color: rgb(var(--primary));
  cursor: pointer;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  transition: 150ms;
  :disabled {
    cursor: not-allowed;
    opacity: 0.3;

    ${p =>
      p.kind === 'primary' &&
      css`
        background-color: rgba(var(--disabled), 0.7);
        opacity: 1;
      `}
  }
  ${space};
  ${layout};
  ${p =>
    p.kind === 'primary' &&
    css`
      border: none;
      background-color: rgb(var(--primary));
      font-weight: 700;
      color: white;
    `}

  ${p =>
    p.kind === 'text' &&
    css`
      border: none;
      padding: 0;
      height: auto;
      font-weight: 700;
      color: rgb(var(--primary));
    `}

  ${p =>
    p.size === 'small' &&
    css`
      border-radius: 10px;
      padding: 6px;
      height: 32px;
    `}
`;

export default Button;
