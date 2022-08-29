import React, { useContext, useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import puzzles from "../../common/data/puzzles";

import ArrowBack from "../../common/components/ArrowBack";
import { AuthContext } from "../../common/services/AuthContext";
import { FREE_RIDDLE_ID } from "../../common/consts";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { upgradedUser } = useContext(AuthContext)

  const puzzle = useMemo(
    () => puzzles.find((puzzle) => puzzle.id === params.puzzleId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRedirect = () => {
    if (upgradedUser.isOn) {
      navigate("/play/puzzles");
    } else {
      navigate("/play")
    }
  };

  if (!upgradedUser.isOn && params.puzzleId !== FREE_RIDDLE_ID) {
    return null;
  }

  return (
    <>
      <ArrowBack onClick={handleRedirect} />
      <CommonPuzzle
        selectedPuzzle={puzzle}
        handleFinishClick={handleRedirect}
      />
    </>
  );
};

export default Puzzle;
