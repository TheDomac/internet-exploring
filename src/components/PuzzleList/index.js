import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ArrowBack from "../../common/components/ArrowBack";
import puzzles from "../../common/data/puzzles.json";
import { PuzzleContext } from "../../common/services/PuzzleContext";

import {
  PuzzleLink,
  PuzzleListContainer,
  PuzzleRow,
  PuzzleTitle,
  SolutionDisplayToggle,
  TextLink,
} from "./index.styled";

const PuzzleList = () => {
  const {
    puzzlesSolvingSync,
    areSolutionsHidden,
    handleToggleAreSolutionsHidden,
  } = useContext(PuzzleContext);

  const sortedPuzzles = puzzles.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <PuzzleListContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "7px",
        }}
        onClick={handleToggleAreSolutionsHidden}
      >
        <SolutionDisplayToggle $areSolutionsHidden={areSolutionsHidden.isOn}>
          {areSolutionsHidden.isOn ? "Show" : "Hide"} solved solutions
        </SolutionDisplayToggle>
      </div>
      {sortedPuzzles.map((puzzle) => (
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
                to={`/play/puzzles/${puzzle.id}?selectedRebusIndex=${rebusIndex}`}
                key={rebus.id}
                $isSolved={isSolved}
                $isDisabled={
                  rebusIndex === puzzle.rebuses.length - 1 &&
                  !areAllPreviousRebusesSolved
                }
              >
                {isSolved && !areSolutionsHidden.isOn
                  ? rebus.solutionInfo.solvedText
                  : "?"}
              </PuzzleLink>
            );
          })}
        </PuzzleRow>
      ))}
      <p style={{ textAlign: "center" }}>
        {/* This list is constantly getting updated. Check out{" "}
        <TextLink to="/play/workshop">workshop</TextLink> for more! */}
        This list is constantly getting updated.
        <br /> You can send your suggestions and ideas to
        contact@internetexploring.io
        <br />
        If you like the game you can{" "}
        <TextLink
          href="https://www.buymeacoffee.com/internetexp"
          target="_blank"
        >
          buy me a coffee
        </TextLink>
        .
      </p>
      <Link to="/play">
        <ArrowBack />
      </Link>
    </PuzzleListContainer>
  );
};

export default PuzzleList;
