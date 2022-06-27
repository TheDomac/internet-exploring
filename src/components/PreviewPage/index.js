import React, { useContext } from "react";
// import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "../../common/components/Puzzle";

import ArrowBack from "../../common/components/ArrowBack";
import { WorkshopContext } from "../../common/services/WorkshopContext";

const PreviewPage = () => {
  // const params = useParams();
  const navigate = useNavigate();

  const { puzzle } = useContext(WorkshopContext);

  const handleRedirect = () => {
    navigate("/play/workshop/new");
  };

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

export default PreviewPage;
