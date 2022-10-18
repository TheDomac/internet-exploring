import styled, { keyframes} from "styled-components"

const appear = keyframes`
  0% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
  }
`;


export const FadeInDiv = styled.div`
opacity: 0;
animation: ${appear} 0.3s linear forwards;
`
export const FadeInP = styled.p`
opacity: 0;
animation: ${appear} 0.3s linear forwards;
`
export const FadeInSvg = styled.svg`
opacity: 0;
animation: ${appear} 0.3s linear forwards;
`
export const FadeInButton = styled.button`
opacity: 0;
animation: ${appear} 0.3s linear forwards;
`