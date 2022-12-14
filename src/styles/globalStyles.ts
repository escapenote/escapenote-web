import { css } from '@emotion/react';

import { variables } from './variables';
import reset from './reset';
import fonts from './fonts';

const globalStyles = css`
  /* Global CSS Variables */
  ${variables}

  /* CSS Reset */
  ${reset}

  /* Fonts */
  ${fonts}

  /* Common Styles */
  *, *:before, *:after {
    box-sizing: border-box;
  }
  *:focus {
    outline: none; /* Webkit, Safari */
  }
  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: rgb(var(--content));
    line-height: normal;
    overflow-y: scroll;
  }
  body,
  input,
  textarea,
  select,
  button,
  a {
    font-family: var(--family);
    font-size: var(--base);
    color: rgb(var(--text));
  }
  button,
  input {
    padding: 0;
    border: 0;
  }
  button {
    background-color: transparent;
    cursor: pointer;
    outline: none;
    appearance: none;
  }
  img {
    vertical-align: bottom;
    object-fit: cover;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  html,
  body,
  #__next {
    height: 100%;
  }
  #__next,
  #modal,
  header,
  main,
  footer,
  article,
  nav,
  section,
  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
  }

  .link {
    color: rgb(var(--primary));
    text-decoration: underline;
  }
  .invert {
    filter: var(--invert);
  }
  .underline {
    text-decoration: underline;
  }
`;

export default globalStyles;
