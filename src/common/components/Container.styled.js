import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-height: 900px) {
    height: 100vh;
  }
`;

export const Container = ({ children, style }) => (
  <StyledContainer
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={style}
  >
    {children}
  </StyledContainer>
);
