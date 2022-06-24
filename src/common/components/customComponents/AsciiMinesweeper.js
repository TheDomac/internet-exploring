import React from "react";

import Minesweeper from "./core/Minesweeper";
import { CODES } from "./core/Minesweeper/codes";

const minesLocations = [
  [2, 6],
  [2, 5],
  [2, 4],
  [2, 3],
  [3, 2],
  [3, 4],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [9, 5],
  [9, 4],
  [8, 4],
  [7, 4],
  [7, 3],
  [7, 2],
  [8, 2],
  [9, 2],
  [12, 2],
  [13, 2],
  [14, 2],
  [12, 3],
  [12, 4],
  [12, 5],
  [12, 6],
  [13, 6],
  [14, 6],
  [17, 2],
  [17, 3],
  [17, 4],
  [17, 5],
  [17, 6],
  [20, 2],
  [20, 3],
  [20, 4],
  [20, 5],
  [20, 6],
];

const ROWS = 9;
const COLUMNS = 23;

const EMPTY_BOARD = Array(ROWS).fill(Array(COLUMNS).fill(CODES.NOTHING));

const initialBoard = EMPTY_BOARD.map((row, i) =>
  row.map((column, j) =>
    minesLocations.find((c) => c[0] === j && c[1] === i)
      ? CODES.MINE
      : CODES.NOTHING
  )
);

const AsciiMinesweeper = () => {
  return (
    <Minesweeper
      initialBoard={initialBoard}
      ROWS={ROWS}
      COLUMNS={COLUMNS}
      NUMBER_OF_MINES={minesLocations.length}
    />
  );
};

export default AsciiMinesweeper;
