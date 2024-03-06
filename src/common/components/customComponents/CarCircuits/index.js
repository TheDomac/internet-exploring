import React, { useState } from "react";
import { TileRow } from "./index.styled";

import Tile from "./Tile";

const TILE_SIZE = 100;

const initialTiles = [
  [
    {
      isLight: true,
      positions: [true, true, false, false],
    },
    {
      positions: [false, true, false, true],
    },
    {
      isLight: true,
      positions: [false, true, false, false],
    },
    {
      positions: [false, false, true, true],
    },
    {
      isLight: true,
      positions: [true, false, true, false],
    },
    {
      positions: [false, true, true, false],
    },
    {
      positions: [false, false, true, true],
    },
    {
      positions: [false, true, false, true],
    },
    {
      isLight: true,
      positions: [false, false, true, true],
    },
  ],
  [
    {
      positions: [true, false, true, false],
    },
    null,
    null,
    {
      positions: [false, true, false, true],
    },
    null,
    {
      positions: [true, false, true, false],
    },
    {
      positions: [true, false, true, false],
    },
    null,
    {
      positions: [true, false, true, false],
    },
  ],
  [
    {
      positions: [true, false, true, false],
    },
    null,
    null,
    {
      isLight: true,
      positions: [true, true, true, false],
    },
    {
      isLight: true,
      positions: [true, false, true, false],
    },
    {
      positions: [true, false, true, true],
    },
    {
      isLight: true,
      positions: [true, true, true, false],
    },
    {
      positions: [false, true, true, true],
    },
    {
      positions: [false, false, true, true],
    },
  ],
  [
    {
      positions: [true, false, true, false],
    },
    null,
    null,
    {
      positions: [true, false, true, false],
    },
    null,
    {
      positions: [true, false, true, false],
    },
    {
      positions: [true, false, true, false],
    },
    {
      positions: [true, true, false, false],
    },
    {
      positions: [true, false, false, true],
    },
  ],
  [
    {
      isSource: true,
      positions: [false, true, true, false],
    },
    {
      positions: [true, false, true, false],
    },
    {
      isLight: true,
      positions: [true, false, true, false],
    },
    {
      positions: [true, true, false, false],
    },
    null,
    {
      positions: [true, true, false, false],
    },
    {
      positions: [true, false, false, true],
    },
    null,
    {
      isLight: true,
      positions: [false, false, false, true],
    },
  ],
];

const CarCircuits = () => {
  const [tiles, setTiles] = useState(initialTiles);
  const handleRotate = (rowIndex, columnIndex) => {
    const newTiles = tiles.map((row, rI) =>
      row.map((tile, cI) =>
        rowIndex === rI && columnIndex === cI
          ? {
              ...tile,
              positions: [
                tile.positions[3],
                tile.positions[0],
                tile.positions[1],
                tile.positions[2],
              ],
            }
          : tile,
      ),
    );

    setTiles(newTiles);
  };
  return (
    <div>
      {tiles.map((row, rowIndex) => (
        <TileRow key={rowIndex} $width={tiles[0].length * TILE_SIZE}>
          {row.map((tile, columnIndex) => (
            <Tile
              width={TILE_SIZE}
              key={columnIndex}
              tile={tile}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              handleRotate={handleRotate}
              tiles={tiles}
            />
          ))}
        </TileRow>
      ))}
    </div>
  );
};

export default CarCircuits;
