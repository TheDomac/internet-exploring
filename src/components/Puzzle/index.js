import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { AuthContext } from "../../common/services/AuthContext";
import { NUMBER_OF_FREE_RIDDLES } from "../../common/consts";
import { useToggle } from "../../common/services/useToggle";
import { analytics } from "../../common/firebase";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import useIsWeb from "../../common/services/useIsWeb";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { upgradedUser } = useContext(AuthContext);
  const { allPuzzles } = useContext(PuzzleContext);
  const [puzzle, setPuzzle] = useState(null);
  const error = useToggle();
  const loading = useToggle(true);
  const isWeb = useIsWeb()

  const fetchPuzzle = async () => {
    try {
      loading.setOn();
      error.setOff();
      const file = await fetch(`../../puzzles/${params.puzzleId}.json`, {
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
      (p) => p.id === params.puzzleId
    );
    logEvent(analytics, "fetching_riddle", { riddle: foundRiddle?.name });
    const availablePuzzlesIds = allPuzzles.puzzles
      .slice(0, NUMBER_OF_FREE_RIDDLES)
      .map((p) => p.id);
    if (upgradedUser.isOn || availablePuzzlesIds.includes(params.puzzleId) || !isWeb) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upgradedUser.isOn, allPuzzles]);

  const handleRedirect = () => {
    navigate("/play/puzzles");
  };

  return (
    <>
      {puzzle && (
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleRedirect}
          loading={loading.isOn}
          error={error.isOn}
        />
      )}
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Puzzle;
