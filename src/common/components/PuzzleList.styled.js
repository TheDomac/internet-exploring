import styled from "styled-components";
import { Link } from "react-router-dom";
import { FadeInDiv } from "./FadeIn";

export const PuzzleLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

export const Wrapper = styled(FadeInDiv)`
  max-width: 956px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const PuzzleBox = styled.div`
  max-width: 229px;
  width: 229px;
  height: 229px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-family: "Fredoka";
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  transition: 300ms;
  font-size: 24px;
  cursor: pointer;
  position: relative;

  ${({ $isSolved }) => ($isSolved ? "background: #309d6d" : "")};
  ${({ $isDisabled }) =>
    $isDisabled
      ? "border: 2px solid #959595; color: #959595; pointer-events: none;"
      : ""}

  &:hover {
    ${({ $isDisabled }) =>
      $isDisabled
        ? ""
        : `
    background: rgba(255, 255, 255, 0.5);
    color: #082347;
    `}
  }
`;
