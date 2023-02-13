import { css } from '@emotion/react';

export const variables = css`
  :root {
    --family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
      Arial, sans-serif;
    --xsmall: 10px;
    --small: 12px;
    --base: 14px;
    --large: 16px;
    --xlarge: 20px;
    --xxlarge: 24px;
    --xxxlarge: 30px;

    --primary: 255, 129, 66;
    --primary400: 255, 156, 106;
    --primary300: 255, 184, 149;
    --primary200: 255, 213, 192;
    --primary100: 255, 242, 236;
    --secondary: 0, 51, 78;
    --secondary400: 30, 106, 146;
    --secondary300: 87, 170, 214;
    --secondary200: 186, 231, 255;
    --secondary100: 245, 251, 255;
    --greyscale900: 17, 24, 39;
    --greyscale800: 31, 41, 55;
    --greyscale700: 55, 65, 81;
    --greyscale600: 75, 85, 99;
    --greyscale500: 107, 114, 128;
    --greyscale400: 156, 163, 175;
    --greyscale300: 209, 213, 219;
    --greyscale200: 229, 231, 235;
    --greyscale100: 243, 244, 246;
    --greyscale50: 249, 250, 251;
    --text: 17, 24, 39; // greyscale900
    --content: 255, 255, 255;
    --background: 255, 255, 255;
    --border: 243, 244, 246; // greyscale100
    --hover: 250, 250, 250;
    --success: 34, 197, 94;
    --successlight: 74, 222, 128;
    --warning: 250, 204, 21;
    --warninglight: 253, 224, 71;
    --error: 255, 71, 71;
    --errorlight: 255, 113, 113;
    --shadow: 238, 238, 238;
    --invert: invert(0);
  }
`;

export default variables;
