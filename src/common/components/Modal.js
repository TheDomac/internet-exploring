import React, { useRef } from "react";
import styled from "styled-components";

import useClickOutside from "../services/useClickOutside";
import { Button } from "./Button.styled";
import { FadeInDiv } from "./FadeIn";

const StyledModal = styled(FadeInDiv)`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #082347;
  padding: 20px;
  border: 2px solid white;
  border-radius: 5px;

  ${({ $widthLimit }) => ($widthLimit ? "width: 535px; max-width: 535px;" : "")}
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 20px;
  text-align: center;
`;

const Modal = ({
  isModalShown,
  children,
  widthLimit = true,
  onClose = () => {},
}) => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClose);

  if (!isModalShown) {
    return null;
  }
  return (
    <StyledModal>
      <ModalContent $widthLimit={widthLimit} ref={wrapperRef}>
        {children}
      </ModalContent>
    </StyledModal>
  );
};

export const ModalConfirm = ({ onConfirm, onClose, text }) => {
  return (
    <>
      <Text>{text}</Text>
      <ButtonsWrapper>
        <Button onClick={onConfirm} style={{ marginRight: "10px" }}>
          Yes
        </Button>
        <Button onClick={onClose}>No</Button>
      </ButtonsWrapper>
    </>
  );
};

export const ModalInfo = ({ onClose, text, children, buttonText = "OK" }) => {
  return (
    <>
      {children || <Text>{text}</Text>}
      <ButtonsWrapper>
        <Button style={{ margin: "0 auto" }} onClick={onClose}>
          {buttonText}
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default Modal;
