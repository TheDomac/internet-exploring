import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg); 
  }
  100% {
    transform: rotate(360deg); 
  }
`;
const Loading = styled.div`
  border: 12px solid #f3f3f3;
  border-top: 12px solid #1a744a;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

export default Loading;
