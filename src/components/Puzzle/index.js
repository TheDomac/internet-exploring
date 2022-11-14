import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import puzzles from "../../common/data/puzzles";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/play/puzzles");
  };

  const foundPuzzle = puzzles.find((p) => p.id === params.puzzleId);
  const puzzle =
    foundPuzzle && require(`../../common/data/puzzles/${foundPuzzle.id}.json`);
  return (
    <>
      {puzzle && (
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleRedirect}
        />
      )}
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Puzzle;
