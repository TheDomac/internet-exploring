import styled, { keyframes } from "styled-components";

const clueGroupColors = [
  "transparent",
  "rgb(26, 117, 74)",
  "#afaf3b",
  "#7a2e7a",
  "#37b3e3",
];

export const ClueValuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledClue = styled.div`
  margin: 5px;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  transition: 300ms;
  position: relative;
  opacity: 0;
  animation: ${appear} 0.7s ease-out forwards;

  ${({ $isHiddenClue }) =>
    $isHiddenClue
      ? `
    filter: blur(10px);
`
      : ""}

  ${({ $clueGroup }) => `
  border: 2px solid ${clueGroupColors[$clueGroup]};
  `}

  ${({ $helpClicked }) =>
    $helpClicked
      ? `

  border: 2px solid rgba(255,255,255, 0.4);
  `
      : ""}
`;

export const StyledClueValue = styled.div`
  box-sizing: border-box;
  margin: 5px;
`;

export const HelpArea = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  transition: 300ms;
  opacity: 0;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $helpClicked }) =>
    $helpClicked
      ? `
opacity: 1;
visibility: visible;
`
      : ""}

  ${({ $isHelpUsed }) =>
    $isHelpUsed
      ? "background: rgba(50, 50, 50, 0.8);"
      : `
        background: rgba(0, 0, 0, 0.8);
      &:hover {
        cursor: pointer;
        opacity: 1;
        -webkit-text-stroke: 2px #082347;
`};
`;

export const BlockArea = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 1;
  visibility: visible;
`;
