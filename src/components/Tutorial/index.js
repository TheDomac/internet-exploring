import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

import CommonPuzzle from "../../common/components/Puzzle";
import tutorial from "../../common/data/tutorial.json";

import ArrowBack from "../../common/components/ArrowBack";
import { analytics } from "../../common/firebase";

const Tutorial = () => {
  useEffect(() => {
    logEvent(analytics, 'tutorial_shown');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <CommonPuzzle
        selectedPuzzle={tutorial}
        handleFinishClick={handleRedirect}
      />
      <ArrowBack onClick={handleRedirect} />
    </>
  );
};

export default Tutorial;
