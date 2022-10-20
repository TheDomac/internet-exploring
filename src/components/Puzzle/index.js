import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { AuthContext } from "../../common/services/AuthContext";
import { PaymentContext } from "../../common/services/PaymentContext";
import { FREE_RIDDLE_ID } from "../../common/consts";
import { useToggle } from "../../common/services/useToggle";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { upgradedUser } = useContext(AuthContext);
  const { upgradeModal } = useContext(PaymentContext);

  const [puzzle, setPuzzle] = useState(null);
  const error = useToggle();
  const loading = useToggle(true);

  const fetchPuzzle = async () => {
    try {
      loading.setOn();
      error.setOff();
      const file = await fetch(`../../puzzles/${params.puzzleId}.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const newPuzzle = await file.json();
      setPuzzle(newPuzzle);
      loading.setOff();
    } catch (err) {
      error.setOn();
      loading.setOff();
      console.log(err);
    }
  };

  useEffect(() => {
    if (upgradedUser.isOn || params.puzzleId === FREE_RIDDLE_ID) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upgradedUser.isOn]);

  const handleRedirect = () => {
    if (upgradedUser.isOn) {
      navigate("/play/puzzles");
    } else {
      navigate("/");
      upgradeModal.setOn();
    }
  };

  return (
    <>
      {puzzle && (
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={handleRedirect}
          loading={loading.isOn}
          error={error.isOn}
        />
      )}
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Puzzle;
