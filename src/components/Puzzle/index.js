import React, { useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import puzzles from "../../common/data/puzzles.json";

import ArrowBack from "../../common/components/ArrowBack";


const Puzzle = () => {

console.log(process.env)
  const params = useParams();
  const navigate = useNavigate();

  const puzzle = useMemo(
    () => puzzles.find((puzzle) => puzzle.id === params.puzzleId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRedirect = () => {
    navigate("/play/puzzles");
  };

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
