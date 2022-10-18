import styled from "styled-components";

import React, { useContext } from "react";

import { Button } from "../Button.styled";
import Modal from "../Modal";
import { PuzzleContext } from "../../services/PuzzleContext";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const HelpModal = () => {
  const { closeHelpModal, helpModalText } = useContext(PuzzleContext);

  return (
    <Modal
      isModalShown={Boolean(helpModalText)}
    >
      <Text>{helpModalText}</Text>
      <ButtonsWrapper>
        <Button onClick={closeHelpModal}>OK</Button>
      </ButtonsWrapper>
    </Modal>
  );
};

export default HelpModal;
