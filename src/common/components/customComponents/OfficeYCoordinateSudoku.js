import React from "react";
import { useToggle } from "../../services/useToggle";

import Counter from "./core/Counter";
import Sudoku from "./core/Sudoku";

const solution = [1, 1, 8, 4, 3, 6, 5, 3, 5];

const initialGame = [
  [
    {
      value: null,
      isPrefilled: false,
      x: 0,
      y: 0,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 0,
      y: 1,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 0,
      y: 2,
    },
    {
      value: null,
      isPrefilled: false,
      x: 0,
      y: 3,
      isHighlighted: true,
    },
    {
      value: 2,
      isPrefilled: true,
      x: 0,
      y: 4,
    },
    {
      value: 6,
      isPrefilled: true,
      x: 0,
      y: 5,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 0,
      y: 6,
    },
    {
      value: null,
      isPrefilled: false,
      x: 0,
      y: 7,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 0,
      y: 8,
    },
  ],
  [
    {
      value: 9,
      isPrefilled: true,
      x: 1,
      y: 0,
    },
    {
      value: null,
      isPrefilled: false,
      x: 1,
      y: 1,
    },
    {
      value: 3,
      isPrefilled: true,
      x: 1,
      y: 2,
    },
    {
      value: 4,
      isPrefilled: true,
      x: 1,
      y: 3,
    },
    {
      value: null,
      isPrefilled: false,
      x: 1,
      y: 4,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 1,
      y: 5,
    },
    {
      value: null,
      isPrefilled: false,
      x: 1,
      y: 6,
      isHighlighted: true,
    },
    {
      value: 6,
      isPrefilled: true,
      x: 1,
      y: 7,
    },
    {
      value: 2,
      isPrefilled: true,
      x: 1,
      y: 8,
    },
  ],
  [
    {
      value: 2,
      isPrefilled: true,
      x: 2,
      y: 0,
    },
    {
      value: null,
      isPrefilled: false,
      x: 2,
      y: 1,
    },
    {
      value: 1,
      isPrefilled: true,
      x: 2,
      y: 2,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 2,
      y: 3,
    },
    {
      value: null,
      isPrefilled: false,
      x: 2,
      y: 4,
      isHighlighted: true,
    },
    {
      value: 3,
      isPrefilled: true,
      x: 2,
      y: 5,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 2,
      y: 6,
    },
    {
      value: null,
      isPrefilled: false,
      x: 2,
      y: 7,
      isHighlighted: true,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 2,
      y: 8,
    },
  ],
  [
    {
      value: null,
      isPrefilled: false,
      x: 3,
      y: 0,
    },
    {
      value: 2,
      isPrefilled: true,
      x: 3,
      y: 1,
    },
    {
      value: 6,
      isPrefilled: true,
      x: 3,
      y: 2,
    },
    {
      value: null,
      isPrefilled: false,
      x: 3,
      y: 3,
      isHighlighted: true,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 3,
      y: 4,
    },
    {
      value: 1,
      isPrefilled: true,
      x: 3,
      y: 5,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 3,
      y: 6,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 3,
      y: 7,
    },
    {
      value: null,
      isPrefilled: false,
      x: 3,
      y: 8,
    },
  ],
  [
    {
      value: 8,
      isPrefilled: true,
      x: 4,
      y: 0,
    },
    {
      value: 1,
      isPrefilled: true,
      x: 4,
      y: 1,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 4,
      y: 2,
    },
    {
      value: null,
      isPrefilled: false,
      x: 4,
      y: 3,
    },
    {
      value: null,
      isPrefilled: false,
      x: 4,
      y: 4,
    },
    {
      value: null,
      isPrefilled: false,
      x: 4,
      y: 5,
    },
    {
      value: 3,
      isPrefilled: true,
      x: 4,
      y: 6,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 4,
      y: 7,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 4,
      y: 8,
    },
  ],
  [
    {
      value: 3,
      isPrefilled: true,
      x: 5,
      y: 0,
    },
    {
      value: 4,
      isPrefilled: true,
      x: 5,
      y: 1,
    },
    {
      value: null,
      isPrefilled: false,
      x: 5,
      y: 2,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 5,
      y: 3,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 5,
      y: 4,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 5,
      y: 5,
    },
    {
      value: null,
      isPrefilled: false,
      x: 5,
      y: 6,
      isHighlighted: true,
    },
    {
      value: null,
      isPrefilled: false,
      x: 5,
      y: 7,
    },
    {
      value: null,
      isPrefilled: false,
      x: 5,
      y: 8,
    },
  ],
  [
    {
      value: null,
      isPrefilled: false,
      x: 6,
      y: 0,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 6,
      y: 1,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 6,
      y: 2,
    },
    {
      value: null,
      isPrefilled: false,
      x: 6,
      y: 3,
      isHighlighted: true,
    },
    {
      value: 3,
      isPrefilled: true,
      x: 6,
      y: 4,
    },
    {
      value: null,
      isPrefilled: false,
      x: 6,
      y: 5,
    },
    {
      value: 2,
      isPrefilled: true,
      x: 6,
      y: 6,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 6,
      y: 7,
    },
    {
      value: 6,
      isPrefilled: true,
      x: 6,
      y: 8,
    },
  ],
  [
    {
      value: 6,
      isPrefilled: true,
      x: 7,
      y: 0,
    },
    {
      value: null,
      isPrefilled: false,
      x: 7,
      y: 1,
    },
    {
      value: 4,
      isPrefilled: true,
      x: 7,
      y: 2,
    },
    {
      value: null,
      isPrefilled: false,
      x: 7,
      y: 3,
    },
    {
      value: 1,
      isPrefilled: true,
      x: 7,
      y: 4,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 7,
      y: 5,
    },
    {
      value: 5,
      isPrefilled: true,
      x: 7,
      y: 6,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 7,
      y: 7,
    },
    {
      value: null,
      isPrefilled: false,
      x: 7,
      y: 8,
      isHighlighted: true,
    },
  ],
  [
    {
      value: null,
      isPrefilled: false,
      x: 8,
      y: 0,
      isHighlighted: true,
    },
    {
      value: 3,
      isPrefilled: true,
      x: 8,
      y: 1,
    },
    {
      value: null,
      isPrefilled: false,
      x: 8,
      y: 2,
    },
    {
      value: 7,
      isPrefilled: true,
      x: 8,
      y: 3,
    },
    {
      value: 6,
      isPrefilled: true,
      x: 8,
      y: 4,
    },
    {
      value: 8,
      isPrefilled: true,
      x: 8,
      y: 5,
    },
    {
      value: null,
      isPrefilled: false,
      x: 8,
      y: 6,
    },
    {
      value: 1,
      isPrefilled: true,
      x: 8,
      y: 7,
    },
    {
      value: 9,
      isPrefilled: true,
      x: 8,
      y: 8,
    },
  ],
];

const OfficeYCoordinateSudoku = ({
  id,
  markAsSolved,
  solved,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const sudokuSolved = useToggle(solved);

  const handleFinish = () => {
    markAsSolved(id, true);
  };

  return (
    <Counter
      solution={solution}
      dotIndex={3}
      isNegative
      onFinish={handleFinish}
      solved={solved}
      isInputShown={sudokuSolved.isOn}
      stateMaintenanceValue={stateMaintenanceValue}
      updateMaintenance={updateMaintenance}
      id={id}
      renderContent={() => (
        <Sudoku initialGame={initialGame} onFinish={sudokuSolved.setOn} />
      )}
    />
  );
};

export default OfficeYCoordinateSudoku;
