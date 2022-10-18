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
      <CommonPuzzle selectedPuzzle={temp} handleFinishClick={handleRedirect} />
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Tutorial;
