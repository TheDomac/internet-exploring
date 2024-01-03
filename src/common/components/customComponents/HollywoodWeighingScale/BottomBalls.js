import { useDrop } from "react-dnd";

import { StyledBottomBalls } from "./index.styled";
import Ball from "./Ball";

const BottomBalls = ({ ballsArray, handleDrop }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: "Ball",
      drop: () => ({ position: "bottom" }),
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
    <StyledBottomBalls ref={dropRef} style={{ backgroundColor }}>
      {ballsArray.map((ball) => (
        <Ball
          ballsArray={ballsArray}
          key={ball.id}
          ball={ball}
          handleDrop={handleDrop}
        />
      ))}
    </StyledBottomBalls>
  );
};

export default BottomBalls;
