import { css } from '@emotion/react';

import { variables } from './variables';
import reset from './reset';
import cropperStyles from 'vendors/cropper';

const globalStyles = css`
  /* Global CSS Variables */
  ${variables}

  /* CSS Reset */
  ${reset}

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
    margin: 0;
    border: 0;
    padding: 0;
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
  section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
  }

  .bold {
    font-weight: bold;
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
  .light {
    body[data-theme='light'] & {
      display: block !important;
    }
    body[data-theme='dark'] & {
      display: none !important;
    }
  }
  .dark {
    body[data-theme='light'] & {
      display: none !important;
    }
    body[data-theme='dark'] & {
      display: block !important;
    }
  }

  /* Custom react-modal-sheet */
  .react-modal-sheet-container {
    left: 0;
    right: 0;
    @media (min-width: 480px) {
      margin: 0 auto;
      max-width: 480px;
    }
    background-color: rgb(var(--content)) !important;
  }
  .react-modal-sheet-container {
    border-top-left-radius: 32px !important;
    border-top-right-radius: 32px !important;
  }
  .react-modal-sheet-drag-indicator {
    height: 10px !important;
    :first-of-type {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    :last-of-type {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }

  /* Cropper styles */
  ${cropperStyles}
`;

export default globalStyles;
