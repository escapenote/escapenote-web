import styled from '@emotion/styled';
import { typography, TypographyProps, color, ColorProps } from 'styled-system';

interface IProps extends TypographyProps, ColorProps {}
const Text = styled.span<IProps>`
  ${typography};
  ${color};
`;

export default Text;
