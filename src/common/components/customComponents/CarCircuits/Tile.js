import React from "react";
import { StyledTile, StyledLight, StyledLine } from "./index.styled";

import lightbulbOff from "./images/lightbulbOff.png";
import lightbulbOn from "./images/lightbulbOn.png";
import source from "./images/source.png";

const getIsConnectedToSource = (tiles, coord) => {
  const [i, j] = coord;
  const selectedTile = tiles[i][j];
  const [top, right, bottom, left] = selectedTile.positions;
  const sourceConnectedTop =
    top &&
    tiles[i - 1] &&
    tiles[i - 1][j] &&
    tiles[i - 1][j].isSource &&
    tiles[i - 1][j].positions[2];
  const sourceConnectedRight =
    right &&
    tiles[i] &&
    tiles[i][j + 1] &&
    tiles[i][j + 1].isSource &&
    tiles[i][j + 1].positions[3];
  const sourceConnectedBottom =
    bottom &&
    tiles[i + 1] &&
    tiles[i + 1][j] &&
    tiles[i + 1][j].isSource &&
    tiles[i + 1][j].positions[0];
  const sourceConnectedLeft =
    left &&
    tiles[i] &&
    tiles[i][j - 1] &&
    tiles[i][j - 1].isSource &&
    tiles[i][j - 1].positions[1];
  return (
    sourceConnectedTop ||
    sourceConnectedRight ||
    sourceConnectedBottom ||
    sourceConnectedLeft
  );
};

const getIsLit = (tiles, tilesToCheck, checkedTiles = []) => {
  return tilesToCheck
    .filter(
      (coord) =>
        !checkedTiles.find((c) => c[0] === coord[0] && c[1] === coord[1])
    )
    .some((coord) => {
      const isConnectedToSource = getIsConnectedToSource(tiles, coord);
      if (isConnectedToSource) {
        return true;
      }

      const [i, j] = coord;
      const selectedTile = tiles[i][j];
      const newTilesToCheck = [];
      if (
        selectedTile.positions[0] &&
        tiles[i - 1] &&
        tiles[i - 1][j] &&
        tiles[i - 1][j].positions &&
        tiles[i - 1][j].positions[2]
      ) {
        newTilesToCheck.push([i - 1, j]);
      }
      if (
        selectedTile.positions[1] &&
        tiles[i] &&
        tiles[i][j + 1] &&
        tiles[i][j + 1].positions &&
        tiles[i][j + 1].positions[3]
      ) {
        newTilesToCheck.push([i, j + 1]);
      }
      if (
        selectedTile.positions[2] &&
        tiles[i + 1] &&
        tiles[i + 1][j] &&
        tiles[i + 1][j].positions &&
        tiles[i + 1][j].positions[0]
      ) {
        newTilesToCheck.push([i + 1, j]);
      }
      if (
        selectedTile.positions[3] &&
        tiles[i] &&
        tiles[i][j - 1] &&
        tiles[i][j - 1].positions &&
        tiles[i][j - 1].positions[1]
      ) {
        newTilesToCheck.push([i, j - 1]);
      }

      if (newTilesToCheck.length > 0) {
        return getIsLit(tiles, newTilesToCheck, checkedTiles.concat([[i, j]]));
      }
      return false;
    });
};

const Tile = ({ tile, rowIndex, columnIndex, handleRotate, tiles, width }) => {
  const handleClick = () => {
    handleRotate(rowIndex, columnIndex);
  };

  if (!tile) {
    return <StyledTile $width={width} />;
  }

  const [top, right, bottom, left] = tile.positions;
  const isLit = getIsLit(tiles, [[rowIndex, columnIndex]]);
  return (
    <StyledTile $withHover $width={width} onClick={handleClick}>
      {tile.isLight && !isLit && (
        <StyledLight src={lightbulbOff} alt="lightbulbOff" />
      )}
      {tile.isLight && isLit && (
        <StyledLight src={lightbulbOn} alt="lightbulbOn" />
      )}
      {tile.isSource && <StyledLight src={source} alt="source" />}
      {top && (
        <StyledLine
          $isLit={isLit}
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "left",
            left: "50%",
          }}
        />
      )}
      {right && <StyledLine $isLit={isLit} style={{ top: "50%", right: 0 }} />}
      {bottom && (
        <StyledLine
          $isLit={isLit}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "right",
            top: "50%",
          }}
        />
      )}
      {left && <StyledLine $isLit={isLit} style={{ top: "50%", left: 0 }} />}
    </StyledTile>
  );
};

export default Tile;
