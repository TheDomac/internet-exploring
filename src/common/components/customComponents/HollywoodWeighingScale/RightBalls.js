import { useDrop } from "react-dnd";

import { StyledRightBalls, EmptyBall } from "./index.styled";
import Ball from "./Ball";

const RightBalls = ({ ballsArray, handleDrop }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: "Ball",
      drop: () => ({ position: "right" }),
      canDrop: () => ballsArray.length < 4,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [ballsArray]
  );

  const isActive = canDrop && isOver;
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "rgba(0,0,0,0.6)";
  } else if (canDrop) {
    backgroundColor = "rgba(0,0,0,0.4)";
  }

  return (
    <StyledRightBalls ref={dropRef} style={{ backgroundColor }}>
      {ballsArray.map((ball) => (
        <Ball
          ballsArray={ballsArray}
          key={ball.id}
          ball={ball}
          handleDrop={handleDrop}
        />
      ))}
      {Array.from(Array(3 - ballsArray.length).keys()).map((n) => (
        <EmptyBall key={n}>?</EmptyBall>
      ))}
    </StyledRightBalls>
  );
};

export default RightBalls;
