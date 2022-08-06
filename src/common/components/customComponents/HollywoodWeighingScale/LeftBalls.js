import { useDrop } from "react-dnd";

import { StyledLeftBalls, EmptyBall } from "./index.styled";
import Ball from "./Ball";

const LeftBalls = ({ ballsArray, handleDrop }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: "Ball",
      drop: () => ({ position: "left" }),
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
    <StyledLeftBalls ref={dropRef} style={{ backgroundColor }}>
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
    </StyledLeftBalls>
  );
};

export default LeftBalls;
