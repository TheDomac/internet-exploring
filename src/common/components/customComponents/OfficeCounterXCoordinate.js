import React from "react";
import styled from "styled-components";

import Counter from "./core/Counter";
import image from "../../../images/OfficeXCoordinateCounter.png";
import CopyableText from "../Clue/CopyableText";

export const Title = styled.div`
  font-size: 19px;
  margin-bottom: 7px;
`;
export const Subtitle = styled.div`
  font-size: 14px;
`;

const solution = [3, 4, 2, 1, 0, 7, 3, 2];

const cluesArray = [
  { title: "The Wheat Sifters", subtitle: "Gustave Courbet" },
  { title: "The Bellelli Family", subtitle: "Edgar Degas" },
  { title: "American Gothic", subtitle: "Grant Wood" },
  { title: "Mona Lisa", subtitle: "Leonardo da Vinci" },
  { title: "The Persistence of Memory", subtitle: "Salvador Dalí" },
  { title: "Romanov family portrait", subtitle: "George Alexander" },
  { title: "The Gleaners", subtitle: "Jean François Millet" },
  { title: "The Arnolfini Portrait", subtitle: "Jan van Eyck" },
];

const OfficeCounterXCoordinate = ({
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
    <>
      <Counter
        solution={solution}
        dotIndex={2}
        onFinish={handleFinish}
        solved={solved}
        stateMaintenanceValue={stateMaintenanceValue}
        updateMaintenance={updateMaintenance}
        id={id}
        renderContent={(selectedIndex) => (
          <>
            <CopyableText
              text={`${cluesArray[selectedIndex].title} ${cluesArray[selectedIndex].subtitle}`}
              displayText={
                <>
                  <Title>{cluesArray[selectedIndex].title}</Title>
                  <Subtitle>{cluesArray[selectedIndex].subtitle}</Subtitle>
                </>
              }
            />
            <div>
              <img src={image} alt="clueImage" />
            </div>
          </>
        )}
      />
    </>
  );
};

export default OfficeCounterXCoordinate;
