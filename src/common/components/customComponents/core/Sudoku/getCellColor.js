const getIsSameRow = (selectedCell, cell) => cell.x === selectedCell.x;
const getIsSameColumn = (selectedCell, cell) => cell.y === selectedCell.y;
const getIsSameSquare = (selectedCell, cell) => {
  const cellSquare = Math.floor(cell.x / 3) * 3 + Math.floor(cell.y / 3);
  const selectedCellSquare =
    Math.floor(selectedCell.x / 3) * 3 + Math.floor(selectedCell.y / 3);
  return cellSquare === selectedCellSquare;
};

const getCellColor = (cell, selectedCell) => {
  if (!selectedCell) {
    return "#FFFFFF";
  }

  const isSameRow = getIsSameRow(selectedCell, cell);
  const isSameColumn = getIsSameColumn(selectedCell, cell);
  const isSameSquare = getIsSameSquare(selectedCell, cell);

  if (selectedCell.value && cell.value === selectedCell.value) {
    return "#4FC3F7";
  } else if (isSameRow && isSameColumn) {
    return "#81D4FA";
  } else if (isSameRow || isSameColumn || isSameSquare) {
    return "#B3E5FC";
  }
  return "#FFFFFF";
};

export default getCellColor;
