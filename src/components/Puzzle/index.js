import React, { useContext, useEffect, useState } from "react";
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
  const [puzzle, setPuzzle] = useState(null);
  const error = useToggle();
  const loading = useToggle(true);

  const fetchPuzzle = async () => {
    try {
      loading.setOn();
      error.setOff();
      const file = await fetch(`../../puzzles/${puzzleId}.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const newPuzzle = await file.json();
      setPuzzle(newPuzzle);
      loading.setOff();
    } catch (err) {
      error.setOn();
      loading.setOff();
      console.log(err);
    }
  };

  useEffect(() => {
    if (!allPuzzles) {
      return;
    }

    const foundRiddle = allPuzzles.puzzles.find(
      (p) => p.id === puzzleId,
    );
    logEvent(analytics, "fetching_riddle", { riddle: foundRiddle?.name });
    const availablePuzzlesIds = allPuzzles.puzzles.map((p) => p.id);
    if (availablePuzzlesIds.includes(puzzleId)) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPuzzles]);

  const handleFinish = () => {
    const solvedPuzzlesIds = localStorage.getItem("solved");
    console.log(solvedPuzzlesIds)
    const solvedPuzzlesIdsParsed = JSON.parse(
      solvedPuzzlesIds || "[]",
    );
    if (!solvedPuzzlesIdsParsed.includes(puzzleId)) {
      const newsolvedPuzzlesIds =
        solvedPuzzlesIdsParsed.concat(puzzleId);
      localStorage.setItem(
        "solved",
        JSON.stringify(newsolvedPuzzlesIds),
      );
    }

    navigate("/play");
  };

  const handleRedirect = () => {
    navigate("/play");
  };


  return (
    <>
      {puzzle && (
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleFinish}
          loading={loading.isOn}
          error={error.isOn}
        />
      )}
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Puzzle;
