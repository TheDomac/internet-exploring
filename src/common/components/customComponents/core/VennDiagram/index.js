import styled from "styled-components";
import CopyableText from "../../../Clue/CopyableText";

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  ${({ $size }) => `width: ${$size}; height: ${$size}`}
`;

const Circle = styled.div`
  position: absolute;
  border: 5px solid white;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  box-sizing: border-box;
`;

const VennDiagram = ({
  topText,
  leftText,
  rightText,
  size,
  correctionsTop,
  correctionsLeft,
  correctionsRight,
  fontSize,
}) => {
  return (
    <Wrapper $size={size}>
      <Circle style={{ left: "50%", transform: "translate(-50%)" }}>
        <CopyableText
          fontSize={fontSize}
          style={{
            position: "absolute",
            ...correctionsTop,
          }}
          text={topText}
        />
      </Circle>
      <Circle style={{ bottom: 0, left: 0 }}>
        <CopyableText
          fontSize={fontSize}
          style={{
            position: "absolute",
            ...correctionsLeft,
          }}
          text={leftText}
        />
      </Circle>
      <Circle style={{ bottom: 0, right: 0 }}>
        <CopyableText
          fontSize={fontSize}
          style={{
            position: "absolute",
            ...correctionsRight,
          }}
          text={rightText}
        />
      </Circle>
      <span
        style={{
          position: "absolute",
          top: "54%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: fontSize || "36px",
        }}
      >
        ?
      </span>
    </Wrapper>
  );
};

export default VennDiagram;
