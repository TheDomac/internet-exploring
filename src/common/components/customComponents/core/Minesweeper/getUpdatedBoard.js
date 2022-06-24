const getUpdatedBoard = (board, x, y, code) => {
  return board.map((row, j) =>
    row.map((cell, i) => (j === y && i === x ? code : cell))
  );
};

export default getUpdatedBoard;
