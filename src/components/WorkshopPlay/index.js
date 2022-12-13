import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";

import { LOCAL_STORAGE_KEYS } from "../../common/consts";
import { PuzzleContext } from "../../common/services/PuzzleContext";

const WorkshopPlayPage = () => {
  const { riddleId } = useParams();
  const navigate = useNavigate();
  const loading = useToggle();
  const error = useToggle();

  const [fetchedPuzzle, setFetchedPuzzle] = useState(null);
  const { allPuzzles } = useContext(PuzzleContext)

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

  useEffect(() => {
    if (!allPuzzles) {
      return;
    }
    const foundPuzzle = allPuzzles.workshopPuzzles.find((p) => p.id === riddleId)

    if (foundPuzzle) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPuzzles]);

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

  return (
    fetchedPuzzle && (
      <>
        <CommonPuzzle
          selectedPuzzle={fetchedPuzzle}
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
