import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import getIsLastRebusAvailable from "../../services/getIsLastRebusAvailable";
import { PuzzleContext } from "../../services/PuzzleContext";
import { LOCAL_STORAGE_KEYS } from "../../consts";

const StyledNextOrFinishButton = styled.button`
  color: #082347;
  border: 2px solid #082347;
  width: 50%;
  display: block;
  margin: 0 auto;
  margin-bottom: 11px;
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  font-family: "Fredoka";
  transition: 300ms;
  opacity: 0;
  visibility: hidden;

  ${({ $isSolved }) =>
    $isSolved
      ? `
    opacity: 1;
    visibility: visible;
  `
      : ""}
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const NextOrFinishButton = ({ isSolved, handleFinishClick }) => {
  const {
    puzzleSolvingState,
    handleNextClick,
    selectedRebusIndex,
    puzzlesSolvingSync,
    setPuzzlesSolvingSync,
    puzzle,
    rebus,
  } = useContext(PuzzleContext);

  const buttonRef = useRef();

  useEffect(() => {
    if (isSolved) {
      buttonRef.current.focus();

      const previousSolvedPuzzle = puzzlesSolvingSync[puzzle.id] || [];

      if (previousSolvedPuzzle.includes(rebus.id)) {
        return;
      }

      const newPuzzlesSolvingSync = {
        ...puzzlesSolvingSync,
        [puzzle.id]: previousSolvedPuzzle.concat(rebus.id),
      };

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SOLVED_PUZZLES,
        JSON.stringify(newPuzzlesSolvingSync)
      );
      setPuzzlesSolvingSync(newPuzzlesSolvingSync);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSolved]);

  const isLastRebusAvailable = getIsLastRebusAvailable(puzzleSolvingState);
  const isDisabled =
    selectedRebusIndex === puzzleSolvingState.length - 2 &&
    !isLastRebusAvailable;
  const isLastIndex = selectedRebusIndex === puzzleSolvingState.length - 1;

  return (
    <StyledNextOrFinishButton
      key={isSolved}
      as={motion.button}
      disabled={isDisabled}
      title={isDisabled ? "Solve other riddles first" : ""}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      type="button"
      ref={buttonRef}
      $isSolved={isSolved}
      onClick={isLastIndex ? handleFinishClick : handleNextClick}
    >
      {isLastIndex ? "Finish" : "Next"}
    </StyledNextOrFinishButton>
  );
};

export default NextOrFinishButton;
