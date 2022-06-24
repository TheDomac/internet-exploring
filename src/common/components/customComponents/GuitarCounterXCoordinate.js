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

const solution = [3, 3, 8, 6, 7];

const cluesArray = [
  { title: "Number of Isaac Newton's laws of motion", subtitle: "" },
  { title: "Number of types of color receptors in a human eye", subtitle: "" },
  { title: "Number of bits in a byte", subtitle: "" },
  { title: "Number of legs insects have", subtitle: "" },
  { title: "Number of sides a heptagon has", subtitle: "" },
];

const GuitarCounterXCoordinate = ({
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
      solved={solved}
      id={id}
      stateMaintenanceValue={stateMaintenanceValue}
      updateMaintenance={updateMaintenance}
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

export default GuitarCounterXCoordinate;
