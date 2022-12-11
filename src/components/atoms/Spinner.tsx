import styled from '@emotion/styled';

const Spinner = () => (
  <Container data-visualcompletion="loading-state">
    <Svg aria-label="읽어들이는 중..." viewBox="0 0 100 100">
      <rect
        height="10"
        opacity="0"
        rx="5"
        ry="5"
        transform="rotate(-90 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.125"
        rx="5"
        ry="5"
        transform="rotate(-45 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.25"
        rx="5"
        ry="5"
        transform="rotate(0 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.375"
        rx="5"
        ry="5"
        transform="rotate(45 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.5"
        rx="5"
        ry="5"
        transform="rotate(90 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.625"
        rx="5"
        ry="5"
        transform="rotate(135 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.75"
        rx="5"
        ry="5"
        transform="rotate(180 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
      <rect
        height="10"
        opacity="0.875"
        rx="5"
        ry="5"
        transform="rotate(225 50 50)"
        width="28"
        x="67"
        y="45"
      ></rect>
    </Svg>
  </Container>
);

const Container = styled.div`
  width: 18px;
  height: 18px;
`;
const Svg = styled.svg`
  fill: rgb(var(--text));
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 0.8s steps(8) infinite;
`;

export default Spinner;
