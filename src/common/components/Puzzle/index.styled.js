import styled from "styled-components";
import { FadeInDiv } from "../FadeIn";

export const PuzzleWrapper = styled(FadeInDiv)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const HelpButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 100px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  flex-direction: column;
  background: #082347;
  color: white;
  font-family: "Fredoka";
  transition: 300ms;
  border: 2px solid;
  border-bottom-color: #999;
  border-right-color: #999;
  border-top-color: white;
  border-left-color: white;

  & p {
    font-size: 44px;
    margin: 0;
  }

  &:hover {
    background: #0b3368;
  }
  &:disabled {
    background: #939191;
    cursor: not-allowed;
  }
`;
