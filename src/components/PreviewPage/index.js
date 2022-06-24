import React, { useContext } from "react";
// import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import CommonPuzzle from "@rebus-mono/common/src/components/Puzzle";

import ArrowBack from "@rebus-mono/common/src/components/ArrowBack";
import { WorkshopContext } from "../../services/WorkshopContext";

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
