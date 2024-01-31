import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { logEvent } from "firebase/analytics";

import ArrowBack from "../../common/components/ArrowBack";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import { PaymentContext } from "../../common/services/PaymentContext";
import { AuthContext } from "../../common/services/AuthContext";
import {
  Wrapper,
  PuzzleBox,
  PuzzleLink,
} from "../../common/components/PuzzleList.styled";

import {
  PuzzleRow,
  PuzzleTitle,
  TextLink,
  BlurredWrapper,
} from "./index.styled";
import { EMAIL, NUMBER_OF_FREE_RIDDLES } from "../../common/consts";
import { HomeButton } from "../Home/index.styled";
import { analytics } from "../../common/firebase";
import useIsWeb from "../../common/services/useIsWeb";

const PuzzleList = () => {
  const { puzzlesSolvingSync, allPuzzles } = useContext(PuzzleContext);
  const { upgradedUser } = useContext(AuthContext);
  const { upgradeModal } = useContext(PaymentContext);
  const isWeb = useIsWeb()

  useEffect(() => {
    logEvent(analytics, "puzzle_list_shown");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!allPuzzles) {
    return null;
  }

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
              <span style={{ fontSize: 40 }}>?</span>
            </PuzzleBox>
          </PuzzleLink>
        );
      })}
    </PuzzleRow>
  );

  return (
    <Wrapper>
      {upgradedUser.isOn || !isWeb ? (
        <>
          {allPuzzles.puzzles.map(renderPuzzle)}
          <p style={{ textAlign: "center" }}>
            Check out{" "}
            <Link style={{ textDecoration: "none" }} to="/play/workshop">
              <TextLink>workshop</TextLink>
            </Link>{" "}
            for more!
            <br /> You can send your suggestions and ideas to{" "}
            {EMAIL}
            <br />
          </p>
        </>
      ) : (
        <>
          {allPuzzles.puzzles
            .slice(0, NUMBER_OF_FREE_RIDDLES)
            .map(renderPuzzle)}
          <div style={{ position: "relative" }}>
            <HomeButton
              style={{
                position: "absolute",
                top: 30,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 3,
              }}
              onClick={upgradeModal.setOn}
            >
              Unlock all riddles
            </HomeButton>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
              }}
            />
            <BlurredWrapper>
              {allPuzzles.puzzles
                .slice(NUMBER_OF_FREE_RIDDLES)
                .map(renderPuzzle)}
            </BlurredWrapper>
          </div>
        </>
      )}

      <Link to="/play">
        <ArrowBack />
      </Link>
    </Wrapper>
  );
};

export default PuzzleList;
