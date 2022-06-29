import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { SolvedBox } from "../../../SolvedBox.styled";
import Check from "../../../Check";

import getCellColor from "./getCellColor";
import checkIfGameIsWon from "./checkIfGameIsWon";
import { Cell, PuzzleWrapper, Row } from "./index.styled";

export const ClickableNumber = styled.button`
  margin-right: 5px;
  cursor: pointer;
  width: 32px;
  height: 32px;

  &:last-child {
    margin-right: 0;
  }
`;

const Sudoku = ({ initialGame, onFinish, solved, solution }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [game, setGame] = useState(initialGame);

  const handleNumberOrDeleteClick = (e) => {
    if (!selectedCell || selectedCell?.isPrefilled) {
      return;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.target.name)) {
      updateGameAtSelectedField(Number(e.target.name));
    }

    if (e.target.name === "Del") {
      updateGameAtSelectedField(null);
    }
  };

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
    <>
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
      {solved ? (
        <SolvedBox
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          $small
        >
          {solution}
          <Check />
        </SolvedBox>
      ) : (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Del"].map((n) => (
          <ClickableNumber
            name={n}
            type="button"
            onClick={handleNumberOrDeleteClick}
            key={n}
          >
            {n}
          </ClickableNumber>
        ))
      )}
    </>
  );
};

export default Sudoku;
