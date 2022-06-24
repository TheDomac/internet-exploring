import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

import { PuzzleWrapper, HelpButton } from "./index.styled";
import HelpModal from "./HelpModal";
import CopyNotification from "./CopyNotification";
import { PuzzleContext } from "../../services/PuzzleContext";
import Breadcrumbs from "../Breadcrumbs";
import Rebus from "../Rebus";

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
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={rebus.style}
    >
      <Breadcrumbs />
      <HelpModal />
      <Rebus handleFinishClick={handleFinishClick} />
      <CopyNotification />
      <HelpButton onClick={helpClicked.toggle}>
        {helpClicked.isOn ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            X
          </motion.p>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>?</p>
          </motion.div>
        )}
      </HelpButton>
    </PuzzleWrapper>
  );
};

export default Puzzle;
