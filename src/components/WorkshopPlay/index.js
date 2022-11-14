import React, { useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import ArrowBack from "../../common/components/ArrowBack";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { LOCAL_STORAGE_KEYS } from "../../common/consts";
import workshopPuzzles from "../../common/data/workshopPuzzles.js";

const WorkshopPlayPage = () => {
  const { riddleId } = useParams();
  const navigate = useNavigate();

  const { workshopPlayPuzzle, setWorkshopPlayPuzzle } =
    useContext(WorkshopContext);

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

    setWorkshopPlayPuzzle(null);
    navigate("/play/workshop");
  };

  const handleRedirect = () => {
    setWorkshopPlayPuzzle(null);
    navigate("/play/workshop");
  };

  const publishedPuzzle = workshopPuzzles.find((p) => p.id === riddleId);

  const puzzle = publishedPuzzle
    ? require(`../../common/data/workshopPuzzles/${publishedPuzzle.id}.json`)
    : workshopPlayPuzzle;

  return (
    puzzle && (
      <>
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleFinish}
        />
        <ArrowBack onClick={handleRedirect} />
      </>
    )
  );
};

export default WorkshopPlayPage;
