import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ArrowBack from "../../common/components/ArrowBack";
import { BUY_ME_A_COFFEE_URL } from "../../common/consts";
import puzzles from "../../common/data/puzzles.json";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import {
  Wrapper,
  PuzzleBox,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";

import { PuzzleRow, PuzzleTitle, TextLink } from "./index.styled";

const PuzzleList = () => {
  const {
    puzzlesSolvingSync,
  } = useContext(PuzzleContext);

  const sortedPuzzles = puzzles.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
      ))}
      <p style={{ textAlign: "center" }}>
        This list is frequently getting updated. Check out{" "}
        <Link style={{ textDecoration: "none" }} to="/play/workshop">
          <TextLink>workshop</TextLink>
        </Link>{" "}
        for more!
        <br /> You can send your suggestions and ideas to
        contact@internetexploring.io
        <br />
        If you'd like to support the game you can{" "}
        <a
          style={{ textDecoration: "none" }}
          href={BUY_ME_A_COFFEE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <TextLink>buy me a coffee</TextLink>
        </a>
        .
      </p>
      <Link to="/play">
        <ArrowBack />
      </Link>
    </Wrapper>
  );
};

export default PuzzleList;
