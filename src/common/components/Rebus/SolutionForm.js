import React, { useContext } from "react";
import styled from "styled-components";

import TextInput from "../TextInput";
import DateInput from "../DateInput";
import { solutionTypes } from "../../consts";
import { PuzzleContext } from "../../services/PuzzleContext";
import getIsSolved from "../../services/getIsSolved";
import NextOrFinishButton from "./NextOrFinishButton";
import { SolvedBox } from "../SolvedBox.styled";
import Check from "../Check";
import { FadeInDiv } from "../FadeIn";

const RebusSolutionFormWrapper = styled(FadeInDiv)`
  width: 500px;
  max-width: 500px;
`;

const SolutionInputWrapper = styled.div`
  margin-bottom: 12px;
`;

const SolutionForm = ({ handleFinishClick }) => {
  const {
    puzzleSolvingState,
    selectedRebusIndex,
    markRebusAsSolved,
    rebus,
    stateMaintenance,
    updateRebusMaintenance,
  } = useContext(PuzzleContext);

  const { cluesSolvedSolution, rebusSolvedSolution } = getIsSolved(
    puzzleSolvingState,
    selectedRebusIndex,
  );

  return (
    <RebusSolutionFormWrapper
      key={rebus.id}
      style={{
        animationDelay: `${rebus.clues.length * 0.5}s`,
      }}
    >
      <SolutionInputWrapper>
        {rebus.solutionInfo.possibleSolutions.length > 0 &&
          rebus.solutionInfo.type === solutionTypes.TEXT && (
            <TextInput
              markAsSolved={markRebusAsSolved}
              isSolved={Boolean(rebusSolvedSolution)}
              solvedText={rebus.solutionInfo.solvedText}
              id={rebus.id}
              possibleSolutions={rebus.solutionInfo.possibleSolutions}
              autoFocus
              placeholder="Type solution here..."
              stateMaintenanceValue={
                stateMaintenance[selectedRebusIndex].solution
              }
              updateMaintenance={updateRebusMaintenance}
            />
          )}
        {rebus.solutionInfo.possibleSolutions.length > 0 &&
          rebus.solutionInfo.type === solutionTypes.DATE && (
            <DateInput
              markAsSolved={markRebusAsSolved}
              isSolved={Boolean(rebusSolvedSolution)}
              solvedText={rebus.solutionInfo.solvedText}
              possibleSolutions={rebus.solutionInfo.possibleSolutions}
              id={rebus.id}
              stateMaintenanceValue={
                stateMaintenance[selectedRebusIndex].solution
              }
              updateMaintenance={updateRebusMaintenance}
            />
          )}
        {rebus.solutionInfo.possibleSolutions.length === 0 &&
          cluesSolvedSolution && (
            <SolvedBox>
              {rebus.solutionInfo.solvedText}
              <Check />
            </SolvedBox>
          )}
      </SolutionInputWrapper>

      <NextOrFinishButton
        handleFinishClick={handleFinishClick}
        isSolved={Boolean(rebusSolvedSolution || cluesSolvedSolution)}
      />
    </RebusSolutionFormWrapper>
  );
};

export default SolutionForm;
