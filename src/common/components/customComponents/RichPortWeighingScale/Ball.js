import { useDrag } from "react-dnd";
import { StyledBall, BallWeight } from "./index.styled";

const Ball = ({ ball, handleDrop, ballsArray }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "Ball",
      item: { ball },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (dropResult?.position) {
          handleDrop(item, dropResult.position);
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [ballsArray],
  );

  return (
    <StyledBall ref={dragRef} style={{ opacity }}>
      <span>{ball.letter}</span>
      <BallWeight>{ball.weight}</BallWeight>
    </StyledBall>
  );
};

export default Ball;
