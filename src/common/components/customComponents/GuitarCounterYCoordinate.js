import React from "react";
import styled from "styled-components";

import Counter from "./core/Counter";
import CopyableText from "../Clue/CopyableText";

export const Title = styled.div`
  font-size: 19px;
  margin-bottom: 7px;
`;
export const Subtitle = styled.div`
  font-size: 14px;
`;

const solution = [6, 3, 9, 8, 7];

const cluesArray = [
  { title: "The smallest perfect number", subtitle: "" },
  { title: "Number of hearts octopus has", subtitle: "" },
  { title: "Number of kids Muhammad Ali had", subtitle: "" },
  { title: "Number of vertices a cube has", subtitle: "" },
  { title: "Number of colors in a rainbow", subtitle: "" },
];

const GuitarCounterYCoordinate = ({
  id,
  markAsSolved,
  solved,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const handleFinish = () => {
    markAsSolved(id, true);
  };

  return (
    <Counter
      solution={solution}
      isNegative
      dotIndex={2}
      onFinish={handleFinish}
      stateMaintenanceValue={stateMaintenanceValue}
      updateMaintenance={updateMaintenance}
      id={id}
      solved={solved}
      renderContent={(selectedIndex) => (
        <CopyableText
          text={`${cluesArray[selectedIndex].title} ${cluesArray[selectedIndex].subtitle}`}
          displayText={
            <>
              <Title>{cluesArray[selectedIndex].title}</Title>
              <Subtitle>{cluesArray[selectedIndex].subtitle}</Subtitle>
            </>
          }
        />
      )}
    />
  );
};

export default GuitarCounterYCoordinate;
