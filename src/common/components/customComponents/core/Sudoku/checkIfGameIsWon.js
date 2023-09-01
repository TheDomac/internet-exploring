const STRINGIFIED_NUMBERS = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const checkIfGameIsWon = (game) => {
  const gameHasEmptyValues = game.some((row) =>
    row.some((cell) => !cell.value),
  );

  if (gameHasEmptyValues) {
    return false;
  }

  const areRowsValid = game.every(
    (row) =>
      JSON.stringify(
        row
          .slice()
          .sort((a, b) => a.value - b.value)
          .map((cell) => cell.value),
      ) === STRINGIFIED_NUMBERS,
  );

  let columns = Array.from(Array(9)).map(() => Array.from(Array(9)));
  game.forEach((row) =>
    row.forEach(
      (cell) => (columns[cell.x][cell.y] = game[cell.y][cell.x].value),
    ),
  );

  const areColumnsValid = columns.every(
    (column) =>
      JSON.stringify(column.slice().sort((a, b) => a - b)) ===
      STRINGIFIED_NUMBERS,
  );

  let squares = Array.from(Array(9)).map(() => Array.from(Array(9)));
  game.forEach((row) =>
    row.forEach((cell, j) => {
      const squareIndex = Math.floor(cell.x / 3) * 3 + Math.floor(cell.y / 3);
      const reversed = (cell.y % 3) * 3 + (cell.x % 3);
      squares[squareIndex][reversed] = game[cell.x][cell.y].value;
    }),
  );

  const areSquaresValid = squares.every(
    (square) =>
      JSON.stringify(square.slice().sort((a, b) => a - b)) ===
      STRINGIFIED_NUMBERS,
  );

  return areRowsValid && areColumnsValid && areSquaresValid;
};

export default checkIfGameIsWon;
