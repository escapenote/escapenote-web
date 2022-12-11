import { css } from '@emotion/react';

export const variables = css`
  :root {
    --family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif;
    --xsmall: 10px;
    --small: 12px;
    --base: 14px;
    --large: 16px;
    --xlarge: 20px;
    --xxlarge: 24px;
    --xxxlarge: 30px;

    --primary: 255, 120, 98;
    --text: 23, 23, 37;
    --content: 246, 244, 240;
    --background: 246, 244, 240;
    --border: 0, 0, 0;
    --hover: 250, 250, 250;
    --shadow: 238, 238, 238;
    --gray: 151, 154, 160;
    --invert: invert(0);
  }
`;

export default variables;
