import React, { useState, useEffect } from "react";
import getCellColor from "./getCellColor";
import checkIfGameIsWon from "./checkIfGameIsWon";
import { Cell, PuzzleWrapper, Row } from "./index.styled";

const Sudoku = ({ initialGame, onFinish }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [game, setGame] = useState(initialGame);

  const checkNumberOdDeleteKeydown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    }
    if (selectedCell?.isPrefilled) {
      return;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
      updateGameAtSelectedField(Number(e.key));
    }

    if (["Backspace", "Delete"].includes(e.key)) {
      updateGameAtSelectedField(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkNumberOdDeleteKeydown);

    return () => {
      window.removeEventListener("keydown", checkNumberOdDeleteKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  const handleCellClick = (cell) => () => {
    const isDeselect = cell.x === selectedCell?.x && cell.y === selectedCell?.y;
    setSelectedCell(isDeselect ? null : cell);
  };

  const updateGameAtSelectedField = (value) => {
    const updatedGame = game.map((row) =>
      row.map((cell) => ({
        ...cell,
        value:
          cell.x === selectedCell.x && cell.y === selectedCell.y
            ? value
            : cell.value,
      }))
    );

    setGame(updatedGame);

    if (value && checkIfGameIsWon(updatedGame)) {
      onFinish();
      setSelectedCell(null);
    } else {
      const updatedSelectedCell = {
        ...selectedCell,
        value,
      };
      setSelectedCell(updatedSelectedCell);
    }
  };

  return (
    <PuzzleWrapper>
      {game.map((row, i) => (
        <Row key={i}>
          {row.map((cell) => (
            <Cell
              key={`${cell.x}${cell.y}`}
              backgroundColor={getCellColor(cell, selectedCell)}
              onClick={handleCellClick(cell)}
              isPrefilled={cell.isPrefilled}
              isHighlighted={cell.isHighlighted}
            >
              {cell.value}
            </Cell>
          ))}
        </Row>
      ))}
    </PuzzleWrapper>
  );
};

export default Sudoku;
