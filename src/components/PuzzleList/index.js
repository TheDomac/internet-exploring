import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ArrowBack from "../../common/components/ArrowBack";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import {
  Wrapper,
  PuzzleBox,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";

import { PuzzleRow, PuzzleTitle, TextLink } from "./index.styled";

const PuzzleList = () => {
  const { puzzlesSolvingSync, allPuzzles } = useContext(PuzzleContext);

  const renderPuzzle = (puzzle) => (
    <PuzzleRow key={puzzle.id}>
      <PuzzleTitle>{puzzle.name}</PuzzleTitle>
      {puzzle.rebuses.map((rebus, rebusIndex) => {
        const isSolved =
          puzzlesSolvingSync[puzzle.id] &&
          puzzlesSolvingSync[puzzle.id].includes(rebus.id);

        const areAllPreviousRebusesSolved = puzzle.rebuses.every((r, i) => {
          if (i === puzzle.rebuses.length - 1) {
            return true;
          }
          return (
            puzzlesSolvingSync[puzzle.id] &&
            puzzlesSolvingSync[puzzle.id].includes(r.id)
          );
        });

        return (
          <PuzzleLink
            key={rebus.id}
            to={`/play/puzzles/${puzzle.id}?selectedRebusIndex=${rebusIndex}`}
          >
            <PuzzleBox
              $isSolved={isSolved}
              $isDisabled={
                rebusIndex === puzzle.rebuses.length - 1 &&
                !areAllPreviousRebusesSolved
              }
            >
              <span style={{ fontSize: isSolved ? 20 : 40 }}>
                {isSolved ? rebus.solutionInfo.solvedText : "?"}
              </span>
            </PuzzleBox>
          </PuzzleLink>
        );
      })}
    </PuzzleRow>
  );

  if (!allPuzzles) {
    return null
  }

  return (
    <Wrapper>
      {allPuzzles.puzzles.map(renderPuzzle)}
      <p style={{ textAlign: "center" }}>
        This list is frequently getting updated. Check out{" "}
        <Link style={{ textDecoration: "none" }} to="/play/workshop">
          <TextLink>workshop</TextLink>
        </Link>{" "}
        for more!
        <br /> You can send your suggestions and ideas to
        contact@internetexploring.io
        <br />
      </p>
      <Link to="/play">
        <ArrowBack />
      </Link>
    </Wrapper>
  );
};

export default PuzzleList;
