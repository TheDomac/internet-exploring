import styled from "styled-components";
import React from "react";

const ArrowWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  width: 100px;
  cursor: pointer;
  z-index: 3;
`;

const StyledSvg = styled.svg`
  fill: rgba(255, 255, 255, 0.3);
  transition: 300ms;

  &:hover {
    fill: rgba(255, 255, 255, 0.5);
  }
`;

const ArrowBack = ({ onClick = () => {} }) => {
  return (
    <ArrowWrapper onClick={onClick}>
      <StyledSvg focusable="false" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </StyledSvg>
    </ArrowWrapper>
  );
};

export default ArrowBack;
