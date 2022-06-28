import React from "react";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";
import temp from "../../common/data/temp.json";

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
        selectedPuzzle={temp}
        handleFinishClick={handleRedirect}
      />
    </>
  );
};

export default Tutorial;
