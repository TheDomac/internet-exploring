import React, { useContext } from "react";
import styled from "styled-components";

import { PuzzleContext } from "../../services/PuzzleContext";

const CopySpan = styled.span`
  display: inline-block;
  cursor: pointer;
  transition: 300ms;
  border-radius: 5px;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 5px;
  word-break: break-word;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${({ fontSize }) => `font-size: ${fontSize};`}
`;

const CopyableText = ({ text, displayText = text, fontSize = "25px" }) => {
  const { handleCopyClick } = useContext(PuzzleContext);

  const handleClick = async () => {
    handleCopyClick({
      text,
      notificationText: `Copied "${text}" to clipboard`,
    });
  };

  return (
    <div>
      <CopySpan onClick={handleClick} fontSize={fontSize}>
        {displayText}
      </CopySpan>
    </div>
  );
};

export default CopyableText;
