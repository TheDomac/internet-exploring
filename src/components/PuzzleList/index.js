import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ArrowBack from "../../common/components/ArrowBack";
import puzzles from "../../common/data/puzzles.json";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import { Wrapper, PuzzleBox, PuzzleLink } from "../../common/components/PuzzleList.styled";

import { PuzzleRow, PuzzleTitle, TextLink } from "./index.styled";

const PuzzleList = () => {
  const {
    puzzlesSolvingSync,
    areSolutionsHidden,
    handleToggleAreSolutionsHidden,
  } = useContext(PuzzleContext);

  const sortedPuzzles = puzzles.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "7px",
        }}
        onClick={handleToggleAreSolutionsHidden}
      >
        <CheckboxButton
          $isChecked={areSolutionsHidden.isOn}
          style={{ borderRadius: "10px", width: "170px" }}
        >
          {areSolutionsHidden.isOn ? "Show" : "Hide"} solved solutions
        </CheckboxButton>
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

            const isTextShown = isSolved && !areSolutionsHidden.isOn;
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
                  <span style={{ fontSize: isTextShown ? 20 : 40 }}>
                    {isTextShown ? rebus.solutionInfo.solvedText : "?"}
                  </span>
                </PuzzleBox>
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
    </Wrapper>
  );
};

export default PuzzleList;
