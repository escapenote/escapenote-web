import styled from '@emotion/styled';
import {
  DisplayProps,
  display,
  FlexboxProps,
  flexbox,
  SpaceProps,
  space,
  color,
  FontWeightProps,
  fontWeight,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
} from 'styled-system';

interface IProps
  extends DisplayProps,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FontWeightProps,
    PositionProps {
  center?: boolean;
}
const Box = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  ${display}
  ${flexbox}
  ${space}
  ${color}
  ${layout}
  ${position}
  ${fontWeight}
`;

export default Box;
