import { CODES } from "./codes";
import getUpdatedBoard from "./getUpdatedBoard";

// Define function to get mine count
const getMineCount = (boardData, x, y) => {
  let aroundCode = [];
  let mineCount = 0;

  aroundCode = boardData[y - 1]
    ? aroundCode.concat(
        boardData[y - 1][x - 1],
        boardData[y - 1][x],
        boardData[y - 1][x + 1]
      )
    : aroundCode;
  aroundCode = aroundCode.concat(boardData[y][x - 1], boardData[y][x + 1]);
  aroundCode = boardData[y + 1]
    ? aroundCode.concat(
        boardData[y + 1][x - 1],
        boardData[y + 1][x],
        boardData[y + 1][x + 1]
      )
    : aroundCode;

  mineCount = aroundCode.filter((v) =>
    [CODES.MINE, CODES.MINE_FLAG, CODES.MINE_QUESTION].includes(v)
  ).length;

  return mineCount;
};

const expandOpenedCell = (oldBoardData, xPos, yPos) => {
  let boardData = oldBoardData;
  // Using DFS algorithm to expand
  const dfsSearch = (x, y) => {
    if (boardData[y][x] !== CODES.NOTHING) {
      return;
    }

    const mineCount = getMineCount(boardData, x, y);

    boardData = getUpdatedBoard(boardData, x, y, mineCount);

    let aroundPoint = [];
    aroundPoint = boardData[y - 1]
      ? aroundPoint.concat(
          { x: x - 1, y: y - 1 },
          { x, y: y - 1 },
          { x: x + 1, y: y - 1 }
        )
      : aroundPoint;
    aroundPoint = aroundPoint.concat({ x: x - 1, y }, { x: x + 1, y });
    aroundPoint = boardData[y + 1]
      ? aroundPoint.concat(
          { x: x - 1, y: y + 1 },
          { x, y: y + 1 },
          { x: x + 1, y: y + 1 }
        )
      : aroundPoint;

    if (boardData[y][x] === 0) {
      aroundPoint.forEach((v) => {
        dfsSearch(v.x, v.y);
      });
    }
  };

  dfsSearch(xPos, yPos);
  return boardData;
};

export default expandOpenedCell;
