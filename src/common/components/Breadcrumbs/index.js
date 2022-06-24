import React, { useContext } from "react";
import styled from "styled-components";

import { PuzzleContext } from "../../services/PuzzleContext";
import Circle from "./Circle";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 500px;
  max-width: 350px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Hr = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  width: 100%;
  z-index: -1;
  border-radius: 50%;
`;

const Breadcrumbs = () => {
  const { puzzle } = useContext(PuzzleContext);

  return (
    <Wrapper>
      <Hr />
      {puzzle.rebuses.map((rebus, i) => (
        <Circle key={i} rebusIndex={i} />
      ))}
    </Wrapper>
  );
};

export default Breadcrumbs;
