import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";
import { analytics } from "../../common/firebase";
import { PuzzleContext } from "../../common/services/PuzzleContext";

const Puzzle = () => {
  const { puzzleId } = useParams();
  const navigate = useNavigate();
  const { allPuzzles } = useContext(PuzzleContext);
  const error = useToggle();

  const foundPuzzle = useMemo(
    () => allPuzzles.find((p) => p.id === puzzleId),
    [allPuzzles, puzzleId],
  );

  useEffect(() => {
    logEvent(analytics, "fetching_riddle", { riddle: foundPuzzle?.name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinish = () => {
    const solvedPuzzlesIds = localStorage.getItem("solved");
    const solvedPuzzlesIdsParsed = JSON.parse(solvedPuzzlesIds || "[]");
    if (!solvedPuzzlesIdsParsed.includes(puzzleId)) {
      const newsolvedPuzzlesIds = solvedPuzzlesIdsParsed.concat(puzzleId);
      localStorage.setItem("solved", JSON.stringify(newsolvedPuzzlesIds));
    }

    navigate("/play");
  };

  const handleRedirect = () => {
    navigate("/play");
  };

  return (
    <>
      {foundPuzzle && (
        <CommonPuzzle
          selectedPuzzle={foundPuzzle}
          handleFinishClick={handleFinish}
          error={error.isOn}
        />
      )}
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Puzzle;
