import styled from "styled-components";
import { Link } from "react-router-dom";

export const PuzzleLink = styled(Link)`
  max-width: 170px;
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-family: "Fredoka";
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  transition: 300ms;
  font-size: 25px;

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

export const PuzzleListContainer = styled.div`
  max-width: 956px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const PuzzleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & ${PuzzleLink}:last-child {
    margin-left: 30px;
  }
`;

export const PuzzleTitle = styled.div`
  font-size: 30px;
  width: 200px;
  margin-right: 11px;
`;

export const SolutionDisplayToggle = styled.button`
  cursor: pointer;
  width: 170px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid white;
  color: white;
  font-family: "Fredoka";
  box-sizing: border-box;
  background: transparent;
  margin: 5px;
  transition: 300ms;

  ${({ $areSolutionsHidden }) =>
    $areSolutionsHidden
      ? `
  background: rgba(255,255,255,0.5);
  color: #082347;
  `
      : ""}
`;

export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.6px white;
`;
