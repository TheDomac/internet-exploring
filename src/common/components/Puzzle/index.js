import React, { useContext, useEffect } from "react";

import { useLocation } from "react-router";

import { PuzzleWrapper, HelpButton } from "./index.styled";
import HelpModal from "./HelpModal";
import CopyNotification from "./CopyNotification";
import { PuzzleContext } from "../../services/PuzzleContext";
import Breadcrumbs from "../Breadcrumbs";
import Rebus from "../Rebus";
import { FadeInDiv, FadeInP } from "../FadeIn";

const Puzzle = ({ selectedPuzzle, handleFinishClick }) => {
  const location = useLocation();
  const { puzzle, initPuzzle, helpClicked, rebus } = useContext(PuzzleContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedRebusIndexParam = params.get("selectedRebusIndex");
    initPuzzle(selectedPuzzle, Number(selectedRebusIndexParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!puzzle) {
    return null;
  }

  return (
    <PuzzleWrapper
      style={rebus.style}
    >
      <Breadcrumbs />
      <HelpModal />
      <Rebus handleFinishClick={handleFinishClick} />
      <CopyNotification />
      <HelpButton onClick={helpClicked.toggle}>
        {helpClicked.isOn ? (
          <FadeInP>
            X
          </FadeInP>
        ) : (
          <FadeInDiv>
            <p>?</p>
          </FadeInDiv>
        )}
      </HelpButton>
    </PuzzleWrapper>
  );
};

export default Puzzle;
