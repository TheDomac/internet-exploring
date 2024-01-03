import { CODES } from "./codes";

const getFlaggedCellsInRowCount = (row) =>
  row.reduce(
    (prev, cell) =>
      [CODES.FLAG, CODES.MINE_FLAG].includes(cell) ? prev + 1 : prev,
    0
  );

const getFlagsCount = (boardData) =>
  boardData.reduce((prev, row) => {
    const openedCellsInRowCount = getFlaggedCellsInRowCount(row);
    return prev + openedCellsInRowCount;
  }, 0);

export default getFlagsCount;
