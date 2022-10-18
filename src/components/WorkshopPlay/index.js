import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { LOCAL_STORAGE_KEYS } from "../../common/consts";
import workshopPuzzles from "../../common/data/workshopPuzzles.js";

const WorkshopPlayPage = () => {
  const { riddleId } = useParams();
  const navigate = useNavigate();
  const loading = useToggle();
  const error = useToggle();

  const [fetchedPuzzle, setFetchedPuzzle] = useState(null);
  const { workshopPlayPuzzle, setWorkshopPlayPuzzle } =
    useContext(WorkshopContext);

  const fetchPuzzle = async () => {
    try {
      loading.setOn();
      const file = await fetch(`../../workshopPuzzles/${riddleId}.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const newFetchedPuzzle = await file.json();
      setFetchedPuzzle(newFetchedPuzzle);
      loading.setOff();
    } catch (err) {
      error.setOn();
      loading.setOff();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const publishedPuzzle = useMemo(
    () => workshopPuzzles.find((p) => p.id === riddleId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const isCorrectWorkshopPlayPuzzle = workshopPlayPuzzle?.id === riddleId;

    if (publishedPuzzle && !isCorrectWorkshopPlayPuzzle) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (error.isOn) {
    return (
      <div
        style={{
          color: "#b74848",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Sorry, something went wrong.
      </div>
    );
  }

  const puzzle = fetchedPuzzle || workshopPlayPuzzle;

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
