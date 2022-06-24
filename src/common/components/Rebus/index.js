import React, { useContext } from "react";
import styled from "styled-components";

import { PuzzleContext } from "../../services/PuzzleContext";
import Clue from "../Clue";
import SolutionForm from "./SolutionForm";

export const RebusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: auto;
  width: 100%;
  max-width: 1200px;
  flex: 1;
`;

const Rebus = ({ handleFinishClick }) => {
  const { rebus } = useContext(PuzzleContext);
  return (
    <>
      <RebusWrapper>
        {rebus.clues.map((clue, i) => {
          return <Clue key={clue.id} clue={clue} clueIndex={i} />;
        })}
      </RebusWrapper>
      <SolutionForm handleFinishClick={handleFinishClick} />
    </>
  );
};

export default Rebus;
