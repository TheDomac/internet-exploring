import React, { useContext } from "react";
import styled from "styled-components";

import { PuzzleContext } from "../../services/PuzzleContext";
import getIsSolved from "../../services/getIsSolved";
import getIsLastRebusAvailable from "../../services/getIsLastRebusAvailable";

const StyledCircledButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-family: "Fredoka";
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  background: #082347;
  border: 2px solid white;
  color: white;

  ${({ $isSelected }) =>
    $isSelected
      ? `
    background: white;
    color: #082347;

    `
      : `
    &:not([disabled]):hover {
        background: #3a546c;
    }
    `}

  ${({ $isSolved }) =>
    $isSolved
      ? `
    
    background: #309d6d;
    color: white;
    
    `
      : ""}

  &:disabled {
    border: 2px solid #ccc;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Circle = ({ rebusIndex }) => {
  const {
    setSelectedRebusIndex,
    selectedRebusIndex,
    puzzleSolvingState,
    helpClicked,
    puzzle,
  } = useContext(PuzzleContext);

  const handleClick = () => {
    helpClicked.setOff();
    setSelectedRebusIndex(rebusIndex);
  };

  const isSolved = getIsSolved(puzzleSolvingState, rebusIndex);

  const isLastRebusAvailable = getIsLastRebusAvailable(
    puzzleSolvingState,
    puzzle.rebuses[puzzle.rebuses.length - 1],
  );
  const isDisabled =
    rebusIndex === puzzleSolvingState.length - 1 && !isLastRebusAvailable;

  return (
    <StyledCircledButton
      onClick={handleClick}
      disabled={isDisabled}
      title={isDisabled ? "Solve other riddles first" : ""}
      $isSelected={rebusIndex === selectedRebusIndex}
      $isSolved={Boolean(
        isSolved.cluesSolvedSolution || isSolved.rebusSolvedSolution,
      )}
    >
      {rebusIndex + 1}
    </StyledCircledButton>
  );
};

export default Circle;
