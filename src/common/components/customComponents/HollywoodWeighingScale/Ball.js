import { useDrag } from "react-dnd";
import { StyledBall } from "./index.styled";

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
    <StyledBall $isPicture={ball.isPicture} ref={dragRef} style={{ opacity }}>
      {ball.value}
    </StyledBall>
  );
};

export default Ball;
