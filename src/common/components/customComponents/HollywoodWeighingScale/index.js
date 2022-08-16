import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import weigh from "./images/weigh.png";
import leftRight from "./images/leftRight.png";
import stand from "./images/stand.png";

import LeftBalls from "./LeftBalls";
import BottomBalls from "./BottomBalls";
import RightBalls from "./RightBalls";

import { Circle, Square, Triangle } from "./Shapes";

import {
  Wrapper,
  WeighWrapper,
  RightWeighWrapper,
  LeftWeighWrapper,
} from "./index.styled";

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

const initialPositions = {
  bottom: [
    { id: 1, value: <span>1</span>, weight: 1 },
    { id: 5, value: <span>1</span>, weight: 1 },
    { id: 2, value: <span>1</span>, weight: 1 },
    { id: 4, value: <Circle />, weight: 2, isPicture: true },
    { id: 3, value: <Square />, weight: 6, isPicture: true },
    { id: 7, value: <Triangle />, weight: 3, isPicture: true },
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

  const sumOfLeftBalls = positions.left.reduce(
    (prev, ball) => prev + ball.weight,
    0
  );
  const sumOfRightBalls = positions.right.reduce(
    (prev, ball) => prev + ball.weight,
    0
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

  return (
    <>
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

              <RightBalls
                handleDrop={handleDrop}
                ballsArray={positions.right}
              />
            </RightWeighWrapper>
          </WeighWrapper>
          <BottomBalls handleDrop={handleDrop} ballsArray={positions.bottom} />
        </Wrapper>
      </DndProvider>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 11 }}>
        <Circle style={{ marginRight: 5 }} />
        <Square style={{ marginRight: 5 }} />
        <Square style={{ marginRight: 5 }} />
        <Triangle />
      </div>
    </>
  );
};

export default RichPortWeighingScale;
