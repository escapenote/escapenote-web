import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  onClick(): void;
}
const Back: React.FC<IProps> = props => (
  <Action onClick={props.onClick}>
    <span
      style={{
        display: 'inline-block',
        transform: 'rotate(270deg)',
        width: 24,
        height: 24,
      }}
    >
      <svg
        className="icon"
        aria-label="back"
        fill="rgb(var(--text))"
        height="24"
        viewBox="0 0 48 48"
        width="24"
        stroke="rgb(var(--text))"
      >
        <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
      </svg>
    </span>
  </Action>
);

const Action = styled.button`
  display: flex;
  flex-direction: column;
  flex-basis: 24px;
`;

export default Back;
