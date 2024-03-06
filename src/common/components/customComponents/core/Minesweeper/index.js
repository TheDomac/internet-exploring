import React, { useState } from "react";

import { Wrapper } from "./index.styled";
import { useToggle } from "../../../../services/useToggle";

import Cell from "./Cell";
import { CODES } from "./codes";
import expandOpenedCell from "./expandOpenedCell";
import getOpenedCellCount from "./getOpenedCellCount";
import getNextCellCode from "./getNextCellCode";
import getUpdatedBoard from "./getUpdatedBoard";
import getFlagsCount from "./getFlagsCount";

const Minesweeper = ({
  initialBoard,
  COLUMNS,
  ROWS,
  NUMBER_OF_MINES,
  onFinish = () => {},
}) => {
  const [board, setBoard] = useState(initialBoard);
  const [remainingMinesCount, setRemainingMinesCount] =
    useState(NUMBER_OF_MINES);
  const wrongAnswer = useToggle();

  const triggerWrongAnswer = async () => {
    wrongAnswer.setOn();
    await new Promise((res) => setTimeout(res, 150));
    wrongAnswer.setOff();
  };

  const openCell = (x, y) => {
    const cellCode = board[y][x];

    if (cellCode === CODES.MINE) {
      setBoard(initialBoard);
      setRemainingMinesCount(NUMBER_OF_MINES);
      triggerWrongAnswer();
    } else if (cellCode === CODES.NOTHING) {
      const newBoard = expandOpenedCell(board, x, y);
      setBoard(newBoard);
      const flagsCount = getFlagsCount(newBoard);
      setRemainingMinesCount(NUMBER_OF_MINES - flagsCount);

      if (ROWS * COLUMNS - NUMBER_OF_MINES === getOpenedCellCount(newBoard)) {
        onFinish();
      }
    }
  };

  const rotateCellState = (x, y) => {
    const code = board[y][x];
    if (code !== CODES.OPENED) {
      const newCode = getNextCellCode(code);
      const newBoard = getUpdatedBoard(board, x, y, newCode);
      setBoard(newBoard);

      const flagsCount = getFlagsCount(newBoard);
      setRemainingMinesCount(NUMBER_OF_MINES - flagsCount);
    }
  };

  return (
    <>
      <div>
        {remainingMinesCount} / {NUMBER_OF_MINES}
      </div>
      <Wrapper $isWrongAnswer={wrongAnswer.isOn} $COLUMNS={COLUMNS}>
        {board.map((row, j) =>
          row.map((cell, i) => (
            <Cell
              key={i}
              x={i}
              y={j}
              board={board}
              openCell={openCell}
              rotateCellState={rotateCellState}
            />
          )),
        )}
      </Wrapper>
    </>
  );
};

export default Minesweeper;
