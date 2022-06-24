import React from "react";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import tutorial from "../../common/data/tutorial.json";

import ArrowBack from "../../common/components/ArrowBack";

const Tutorial = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <ArrowBack onClick={handleRedirect} />
      <CommonPuzzle
        selectedPuzzle={tutorial}
        handleFinishClick={handleRedirect}
      />
    </>
  );
};

export default Tutorial;
