import React from "react";
import styled from "styled-components";
import { FadeInDiv } from "./FadeIn";

const StyledContainer = styled(FadeInDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-height: 900px) {
    height: 100vh;
  }
`;

export const Container = ({ children, style }) => (
  <StyledContainer style={style}>{children}</StyledContainer>
);
