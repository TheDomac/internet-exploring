import React, { useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import TextInput from "../../TextInput";

import weigh from "./images/weigh.png";
import leftRight from "./images/leftRight.png";
import stand from "./images/stand.png";

import LeftBalls from "./LeftBalls";
import BottomBalls from "./BottomBalls";
import RightBalls from "./RightBalls";

import {
  Wrapper,
  SolutionWrapper,
  WeighWrapper,
  RightWeighWrapper,
  LeftWeighWrapper,
} from "./index.styled";
import { FadeInDiv } from "../../FadeIn";

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

const initialPositions = {
  bottom: [
    { id: 1, letter: "R", weight: 4 },
    { id: 5, letter: "P", weight: 16 },
    { id: 2, letter: "I", weight: 25 },
    { id: 4, letter: "H", weight: 13 },
    { id: 3, letter: "C", weight: 8 },
    { id: 7, letter: "R", weight: 5 },
    { id: 6, letter: "O", weight: 18 },
    { id: 8, letter: "T", weight: 11 },
  ],
  right: [],
  left: [],
};

const RichPortWeighingScale = ({
  id,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const [positions, setPositions] = useState(initialPositions);
  const [firstSolution, setFirstSolution] = useState(
    stateMaintenanceValue?.firstSolution || "",
  );
  const [secondSolution, setSecondSolution] = useState(
    stateMaintenanceValue?.secondSolution || "",
  );

  const handleMaintenanceUpdate = (key, value) => {
    updateMaintenance(id, {
      firstSolution:
        key === "firstSolution" ? value : stateMaintenanceValue?.firstSolution,
      secondSolution:
        key === "secondSolution"
          ? value
          : stateMaintenanceValue?.secondSolution,
    });
  };

  const sumOfLeftBalls = positions.left.reduce(
    (prev, ball) => prev + ball.weight,
    0,
  );
  const sumOfRightBalls = positions.right.reduce(
    (prev, ball) => prev + ball.weight,
    0,
  );
  let tilt = 0;
  if (sumOfLeftBalls > sumOfRightBalls) {
    tilt = -10;
  }
  if (sumOfLeftBalls < sumOfRightBalls) {
    tilt = 10;
  }

  const handleDrop = (item, position) => {
    const positionsWithNoBall = {
      bottom: positions.bottom.filter((ball) => ball.id !== item.ball.id),
      left: positions.left.filter((ball) => ball.id !== item.ball.id),
      right: positions.right.filter((ball) => ball.id !== item.ball.id),
    };

    const newPositions = {
      ...positionsWithNoBall,
      [position]: positionsWithNoBall[position].concat(item.ball),
    };
    setPositions(newPositions);
  };

  const markFirstAsSolved = (_, solution) => {
    setFirstSolution(solution.value);
    handleMaintenanceUpdate("firstSolution", solution.value);
  };
  const markSecondAsSolved = (_, solution) => {
    setSecondSolution(solution.value);
    handleMaintenanceUpdate("secondSolution", solution.value);
  };

  let possibleSolutions = [];
  if (![firstSolution, secondSolution].includes("rich")) {
    possibleSolutions.push({ id: 1, value: "rich" });
  }
  if (![firstSolution, secondSolution].includes("port")) {
    possibleSolutions.push({ id: 2, value: "port" });
  }

  if (firstSolution && secondSolution) {
    return (
      <FadeInDiv style={{ fontSize: "50px", height: "100px" }}>
        Rich port
      </FadeInDiv>
    );
  }

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <Wrapper>
        <img src={stand} alt="stand" />
        <WeighWrapper tilt={tilt}>
          <img src={weigh} alt="weigh" />
          <LeftWeighWrapper style={{ transform: `rotate(${tilt * -1}deg)` }}>
            <img src={leftRight} alt="left" />
            <LeftBalls handleDrop={handleDrop} ballsArray={positions.left} />
          </LeftWeighWrapper>
          <RightWeighWrapper style={{ transform: `rotate(${tilt * -1}deg)` }}>
            <img src={leftRight} alt="right" />

            <RightBalls handleDrop={handleDrop} ballsArray={positions.right} />
          </RightWeighWrapper>
        </WeighWrapper>
        <BottomBalls handleDrop={handleDrop} ballsArray={positions.bottom} />

        <SolutionWrapper>
          <TextInput
            small
            possibleSolutions={possibleSolutions}
            isSolved={Boolean(firstSolution)}
            solvedText={firstSolution === "rich" ? "Rich" : "Port"}
            markAsSolved={markFirstAsSolved}
            id={id}
          />

          <TextInput
            small
            possibleSolutions={possibleSolutions}
            isSolved={Boolean(secondSolution)}
            solvedText={secondSolution === "rich" ? "Rich" : "Port"}
            markAsSolved={markSecondAsSolved}
            id={id}
          />
        </SolutionWrapper>
      </Wrapper>
    </DndProvider>
  );
};

export default RichPortWeighingScale;
