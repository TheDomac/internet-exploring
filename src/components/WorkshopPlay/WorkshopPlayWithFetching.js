import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import CommonPuzzle from "../../common/components/Puzzle";
import { db } from "../../common/firebase";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { LOCAL_STORAGE_KEYS, workshopCollectionName } from "../../common/consts";

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
      const docRef = doc(db, workshopCollectionName, riddleId);
      const docSnap = await getDoc(docRef);
      const newFetchedPuzzle = { id: docSnap.id, ...docSnap.data() };
      setFetchedPuzzle(newFetchedPuzzle);
      loading.setOff();
    } catch (err) {
      error.setOn();
      loading.setOff();
    }
  };

  useEffect(() => {
    if (!workshopPlayPuzzle || workshopPlayPuzzle.id !== riddleId) {
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
  }

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
        <ArrowBack onClick={handleRedirect} />
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleFinish}
        />
      </>
    )
  );
};

export default WorkshopPlayPage;
