import styled, { keyframes } from "styled-components";

const anim = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;
const Item = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation: ${anim} 1.2s linear infinite;

  ${({ animationDelay, top, left }) => `
  animation-delay: ${animationDelay}s;
  top: ${top}px;
  left: ${left}px;
`}
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Loading = () => (
  <Wrapper>
    <Item animationDelay={0} top={8} left={8} />
    <Item animationDelay={-0.4} top={8} left={32} />
    <Item animationDelay={-0.8} top={8} left={56} />
    <Item animationDelay={-0.4} top={32} left={8} />
    <Item animationDelay={-0.8} top={32} left={32} />
    <Item animationDelay={-1.2} top={32} left={56} />
    <Item animationDelay={-0.8} top={56} left={8} />
    <Item animationDelay={-1.2} top={56} left={32} />
    <Item animationDelay={-1.6} top={56} left={56} />
  </Wrapper>
);

export default Loading;
