import React from "react";

import Minesweeper from "./core/Minesweeper";
import { CODES } from "./core/Minesweeper/codes";

const minesLocations = [
  [2, 6],
  [2, 5],
  [2, 4],
  [2, 3],
  [2, 2],
  [3, 2],
  [4, 2],
  [3, 4],
  [4, 4],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [8, 6],
  [9, 2],
  [10, 2],
  [9, 4],
  [10, 4],
  [12, 6],
  [12, 5],
  [12, 4],
  [12, 3],
  [13, 2],
  [14, 3],
  [14, 4],
  [14, 5],
  [14, 6],
  [13, 4],
];

const ROWS = 9;
const COLUMNS = 17;

const EMPTY_BOARD = Array(ROWS).fill(Array(COLUMNS).fill(CODES.NOTHING));

const initialBoard = EMPTY_BOARD.map((row, i) =>
  row.map((column, j) =>
    minesLocations.find((c) => c[0] === j && c[1] === i)
      ? CODES.MINE
      : CODES.NOTHING
  )
);

const FIFAMinesweeper = () => {
  return (
    <Minesweeper
      initialBoard={initialBoard}
      ROWS={ROWS}
      COLUMNS={COLUMNS}
      NUMBER_OF_MINES={minesLocations.length}
    />
  );
};

export default FIFAMinesweeper;
