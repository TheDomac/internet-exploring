import React, { memo } from "react";

import { StyledCell } from "./index.styled";
import { CODES } from "./codes";

const getCellText = (code) => {
  switch (code) {
    case CODES.OPENED:
    case CODES.NOTHING:
      return "";
    case CODES.FLAG:
      return "🚩";
    case CODES.MINE_FLAG:
      return "🚩";
    case CODES.QUESTION:
      return "❔";
    case CODES.MINE_QUESTION:
      return "❔";
    case CODES.MINE:
      return "";
    default:
      return code;
  }
};

const Cell = ({ x, y, board, openCell, rotateCellState }) => {
  const onClickCell = () => {
    openCell(x, y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const onRightClickCell = (e) => {
    e.preventDefault();

    rotateCellState(x, y);
  };

  return (
    <StyledCell
      cellCode={board[y][x]}
      onClick={onClickCell}
      onContextMenu={onRightClickCell}
    >
      <span>{getCellText(board[y][x])}</span>
    </StyledCell>
  );
};

export default memo(Cell);
