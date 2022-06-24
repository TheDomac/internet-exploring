import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import React from "react";
import { PuzzleContext } from "../../services/PuzzleContext";

const CopyNotification = styled.div`
  position: fixed;
  top: 90px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.5);
  max-width: 300px;
  border-radius: 10px;
  padding: 10px;
  color: #082347;
  transition: 300ms;
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const CopyableText = () => {
  const [show, setShow] = useState(false);

  const { copyNotification, setCopyNotification } = useContext(PuzzleContext);

  const showForFewSeconds = async () => {
    setShow(true);
    await new Promise((res) => setTimeout(res, 3000));
    setShow(false);
    await new Promise((res) => setTimeout(res, 1000));
    setCopyNotification(null);
  };

  useEffect(() => {
    if (copyNotification) {
      showForFewSeconds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyNotification]);

  return (
    <CopyNotification show={show}>
      {copyNotification?.notificationText}
    </CopyNotification>
  );
};

export default CopyableText;
