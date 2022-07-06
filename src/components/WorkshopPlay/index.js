import React, { useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import ArrowBack from "../../common/components/ArrowBack";
import workshopPuzzles from "../../common/data/workshopPuzzles.json"

import { LOCAL_STORAGE_KEYS, } from "../../common/consts";

const WorkshopPlayPage = () => {
  const { riddleId } = useParams();
  const navigate = useNavigate();


  const handleFinish = () => {
    const workshopSolvedPuzzlesIDs = localStorage.getItem(
      LOCAL_STORAGE_KEYS.WORKSHOP_SOLVED_PUZZLES_IDS
    );
    const workshopSolvedPuzzlesIDsParsed = JSON.parse(
      workshopSolvedPuzzlesIDs || "[]"
    );
    if (!workshopSolvedPuzzlesIDsParsed.includes(riddleId)) {
      const newWorkshopSolvedPuzzlesIDs =
        workshopSolvedPuzzlesIDsParsed.concat(riddleId);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.WORKSHOP_SOLVED_PUZZLES_IDS,
        JSON.stringify(newWorkshopSolvedPuzzlesIDs)
      );
    }

    navigate("/play/workshop");
  };

  const handleRedirect = () => {
    navigate("/play/workshop");
  }

  const workshopPuzzle = useMemo(
    () => workshopPuzzles.find((puzzle) => puzzle.id === riddleId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  return (
    <>
      <ArrowBack onClick={handleRedirect} />
      <CommonPuzzle
        selectedPuzzle={workshopPuzzle}
        handleFinishClick={handleFinish}
      />
    </>
  );
};

export default WorkshopPlayPage;
