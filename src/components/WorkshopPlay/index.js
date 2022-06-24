import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import CommonPuzzle from "@rebus-mono/common/src/components/Puzzle";
import { db } from "@rebus-mono/common/src/firebase";
import ArrowBack from "@rebus-mono/common/src/components/ArrowBack";
import { useToggle } from "@rebus-mono/common/src/services/useToggle";

import { WorkshopContext } from "../../services/WorkshopContext";

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
      const docRef = doc(db, "workshopPuzzles", riddleId);
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
    if (!workshopPlayPuzzle) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <ArrowBack onClick={handleRedirect} />
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleRedirect}
        />
      </>
    )
  );
};

export default WorkshopPlayPage;
