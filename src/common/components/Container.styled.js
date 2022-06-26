import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = ({ children }) => (
  <StyledContainer
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </StyledContainer>
);
