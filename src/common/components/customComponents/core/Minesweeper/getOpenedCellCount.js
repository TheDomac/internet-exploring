import { CODES } from "./codes";

const getOpenedCellsInRowCount = (row) =>
  row.reduce((prev, cell) => (cell >= CODES.OPENED ? prev + 1 : prev), 0);

const getOpenedCellCount = (boardData) =>
  boardData.reduce((prev, row) => {
    const openedCellsInRowCount = getOpenedCellsInRowCount(row);
    return prev + openedCellsInRowCount;
  }, 0);

export default getOpenedCellCount;
