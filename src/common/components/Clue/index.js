import React, { useContext } from "react";
import { motion } from "framer-motion";

import customComponentsArray from "../customComponents";
import {
  StyledClue,
  HelpArea,
  BlockArea,
  StyledClueValue,
  ClueValuesWrapper,
} from "./index.styled";
import CopyableText from "./CopyableText";
import TextInput from "../TextInput";
import { clueTypes, projects, solutionTypes } from "../../consts";
import DateInput from "../DateInput";
import Image from "../Image";
import { PuzzleContext } from "../../services/PuzzleContext";

const Clue = ({ clue, clueIndex }) => {
  const {
    markClueAsSolved,
    viewedHelpClueIds,
    handleClueHelpClick,
    helpClicked,
    puzzleSolvingState,
    selectedRebusIndex,
    project,
    stateMaintenance,
    updateClueMaintenance,
  } = useContext(PuzzleContext);

  const isHiddenClue =
    clue.dependsOn.length > 0 &&
    !clue.dependsOn.every(
      (dependency) =>
        puzzleSolvingState[selectedRebusIndex].clues[dependency.value]
    );

  const isHelpUsed = viewedHelpClueIds.includes(clue.id);

  const handleHelpAreaClick = () => {
    if (!isHelpUsed) {
      handleClueHelpClick(clue);
    }
  };

  return (
    <StyledClue
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: clueIndex * 0.5 } }}
      $helpClicked={clue.helperText && helpClicked.isOn}
      $clueGroup={clue.clueGroup}
      $isHiddenClue={isHiddenClue}
      style={{ ...clue.style, ...(isHiddenClue ? {} : { filter: "none" }) }}
    >
      {isHiddenClue && <BlockArea />}
      {clue.helperText && (
        <HelpArea
          $helpClicked={helpClicked.isOn}
          $isHelpUsed={isHelpUsed}
          onClick={handleHelpAreaClick}
        >
          {isHelpUsed ? (
            clue.helperText
          ) : (
            <span style={{ fontSize: "100px" }}>?</span>
          )}
        </HelpArea>
      )}
      <ClueValuesWrapper>
        {clue.clueValues.map((clueValue) => {
          const CustomComponent =
            clueValue.type === clueTypes.CUSTOM_COMPONENT &&
            customComponentsArray.find((c) => c.name === clueValue.value)
              ?.Component;
          return (
            <StyledClueValue style={clueValue.style} key={clueValue.id}>
              {clueValue.type === clueTypes.TEXT && (
                <CopyableText
                  text={clueValue.value}
                  fontSize={clueValue.style.fontSize}
                />
              )}
              {clueValue.type === clueTypes.IMAGE && (
                <Image fileName={clueValue.value} />
              )}
              {clueValue.type === clueTypes.CUSTOM_COMPONENT && (
                <CustomComponent
                  key={clueValue.id}
                  id={clue.id}
                  solved={puzzleSolvingState[selectedRebusIndex].clues[clue.id]}
                  markAsSolved={markClueAsSolved}
                  stateMaintenanceValue={
                    stateMaintenance[selectedRebusIndex].clues[clue.id]
                  }
                  updateMaintenance={updateClueMaintenance}
                  imageOptions={{
                    hasOnClick: project === projects.ELECTRON,
                  }}
                />
              )}
              {clueValue.subtext && (
                <CopyableText text={clueValue.subtext} fontSize="16px" />
              )}
            </StyledClueValue>
          );
        })}
      </ClueValuesWrapper>

      {clue.subtext && <CopyableText text={clue.subtext} fontSize="16px" />}
      {clue.solutionInfo.possibleSolutions.length > 0 && (
        <>
          {clue.solutionInfo.type === solutionTypes.TEXT && (
            <TextInput
              small
              autoFocus={clueIndex === 0}
              id={clue.id}
              possibleSolutions={clue.solutionInfo.possibleSolutions}
              isSolved={Boolean(
                puzzleSolvingState[selectedRebusIndex].clues[clue.id]
              )}
              solvedText={clue.solutionInfo.solvedText}
              markAsSolved={markClueAsSolved}
              stateMaintenanceValue={
                stateMaintenance[selectedRebusIndex].clues[clue.id]
              }
              updateMaintenance={updateClueMaintenance}
            />
          )}
          {clue.solutionInfo.type === solutionTypes.DATE && (
            <DateInput
              small
              id={clue.id}
              possibleSolutions={clue.solutionInfo.possibleSolutions}
              isSolved={Boolean(
                puzzleSolvingState[selectedRebusIndex].clues[clue.id]
              )}
              solvedText={clue.solutionInfo.solvedText}
              markAsSolved={markClueAsSolved}
              stateMaintenanceValue={
                stateMaintenance[selectedRebusIndex].clues[clue.id]
              }
              updateMaintenance={updateClueMaintenance}
            />
          )}
        </>
      )}
    </StyledClue>
  );
};

export default Clue;
