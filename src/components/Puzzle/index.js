import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { AuthContext } from "../../common/services/AuthContext";
import { FREE_RIDDLE_ID } from "../../common/consts";
import { useToggle } from "../../common/services/useToggle";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { upgradedUser } = useContext(AuthContext);
  const [puzzle, setPuzzle] = useState(null);
  const error = useToggle();
  const loading = useToggle();

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
    fetchPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = () => {
    if (upgradedUser.isOn) {
      navigate("/play/puzzles");
    } else {
      navigate("/");
    }
  };

  const upgradedUserCheck =
    !upgradedUser.isOn && params.puzzleId !== FREE_RIDDLE_ID;

  if (upgradedUserCheck || !puzzle) {
    return null;
  }

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
