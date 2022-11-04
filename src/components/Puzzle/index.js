import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { AuthContext } from "../../common/services/AuthContext";
import  puzzles  from "../../common/data/puzzles";
import { NUMBER_OF_FREE_RIDDLES } from "../../common/consts";
import { useToggle } from "../../common/services/useToggle";

const Puzzle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { upgradedUser } = useContext(AuthContext);

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
    const availablePuzzlesIds = puzzles.slice(0, NUMBER_OF_FREE_RIDDLES).map(p => p.id)
    if (upgradedUser.isOn || availablePuzzlesIds.includes(params.puzzleId)) {
      fetchPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upgradedUser.isOn]);

  const handleRedirect = () => {
    navigate("/play/puzzles");
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
