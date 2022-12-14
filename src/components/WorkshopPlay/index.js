import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { ipcRenderer } from "electron";

import CommonPuzzle from "../../common/components/Puzzle";
import ArrowBack from "../../common/components/ArrowBack";

import { LOCAL_STORAGE_KEYS } from "../../common/consts";
import { PuzzleContext } from "../../common/services/PuzzleContext";
import { useToggle } from "../../common/services/useToggle";

const WorkshopPlayPage = () => {
  const [puzzle, setPuzzle] = useState(null);
  const loading = useToggle()
  const error = useToggle();
  const { riddleId } = useParams();
  const navigate = useNavigate();
  const { allPuzzles } = useContext(PuzzleContext)

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
  };


  useEffect(() => {
    if (allPuzzles) {
      loading.setOn();
      error.setOff()
      ipcRenderer.send("fetch-riddle", `workshopPuzzles/${riddleId}.json`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPuzzles])

  useEffect(() => {
    ipcRenderer.on("fetch-riddle-reply", (event, newPuzzle) => {
      loading.setOff();
      if (newPuzzle) {
        setPuzzle(newPuzzle)
      } else {
        error.setOn()
      }
    });

    return () => {
      ipcRenderer.removeAllListeners("fetch-riddle-reply")
    }
    }, [error, loading]);

  return (
    puzzle && (
      <>
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleFinish}
          loading={loading.isOn}
          error={error.isOn}
        />
        <ArrowBack onClick={handleRedirect} />
      </>
    )
  );
};

export default WorkshopPlayPage;
