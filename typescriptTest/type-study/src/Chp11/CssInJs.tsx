import React from 'react';
import styled from 'styled-components';
import { string } from 'superstruct';

const textStyles = {
  color: 'white',
};
const CssInJs = () => {
  return (
    <div>
      <div style={{ color: 'white' }}>인라인1</div>
      <div style={textStyles}>예시2</div>
      <StyledComponentsEx>CSS-in-JS</StyledComponentsEx>
    </div>
  );
};

export default CssInJs;

const StyledComponentsEx = styled.div`
  color: white;
  background-color: black;
`;

type ButtonRadius = 'xs' | 's' | 'm' | 'l';
export const buttonRadiusStyleMap: Record<ButtonRadius, SerializedStyles> = {
  xs: css`
    border-radius: ${radius.extra_small};
  `,
  // ...
};

interface Props {
  height?: string;
  color?: keyof typeof colors;
  isFull?: boolean;
  className?: string;
  //...
}

interface BadCase {
  height?: string;
  isFull?: boolean;
}

const Component = styled.div<BadCase>`
  height: 100;
  margin: 0;
  ${({ isFull }) =>
    isFull &&
    css`
      margin: 0 -15px;
    `}
`;

const GoodCase = styled.div<Pick<Props, 'height' | 'isFull'>>``;
