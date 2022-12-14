import React from 'react';
import styled from '@emotion/styled';

import iconArrowBack from 'assets/icons/arrow-back.svg';

interface IProps {
  onClick(): void;
}
const Back: React.FC<IProps> = props => (
  <Action onClick={props.onClick}>
    <img src={iconArrowBack} alt="back" width="48px" height="48px" />
  </Action>
);

const Action = styled.button`
  display: flex;
  flex-direction: column;
  flex-basis: 48px;
`;

export default Back;