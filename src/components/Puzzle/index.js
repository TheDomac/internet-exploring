import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { ipcRenderer } from "electron";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";
import { PuzzleContext } from "../../common/services/PuzzleContext";

const Puzzle = () => {
  const [puzzle, setPuzzle] = useState(null);
  const loading = useToggle()
  const error = useToggle();
  const params = useParams();
  const navigate = useNavigate();
  const { allPuzzles} = useContext(PuzzleContext)

  const handleRedirect = () => {
    navigate("/play/puzzles");
  };

  useEffect(() => {
    if (allPuzzles) {
      loading.setOn();
      error.setOff()
      ipcRenderer.send("fetch-riddle", `puzzles/${params.puzzleId}.json`);
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
