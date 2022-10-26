import React from "react";
import WordSearch from "./core/WordSearch";

const words = [
  "SILENCE",
  "MARCH",
  "UNKNOWN",
  "HUNGARY",
  "TOWN",
  "ECHO",
  "STOP",
  "NICE",
  "PRO",
  "RAMBO",
  "OSBORN",
  "CEO",
  "SHIELD",
  "RANDOMLY",
  "ANNIE",
];

const letters = [
  ["E", "S", "H", "I", "E", "L", "D", "R"],
  ["H", "C", "U", "E", "I", "N", "N", "A"],
  ["C", "U", "N", "K", "N", "O", "W", "N"],
  ["R", "P", "G", "E", "C", "H", "O", "D"],
  ["A", "P", "A", "N", "L", "A", "T", "O"],
  ["M", "O", "R", "W", "I", "I", "E", "M"],
  ["B", "T", "Y", "O", "N", "C", "S", "L"],
  ["O", "S", "B", "O", "R", "N", "E", "Y"],
];

const strikeThroughTracking = {
  SILENCE: [
    [6, 6],
    [5, 5],
    [4, 4],
    [3, 3],
    [2, 2],
    [1, 1],
    [0, 0],
  ],
  MARCH: [
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
  ],
  UNKNOWN: [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
  ],
  HUNGARY: [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
  ],
  TOWN: [
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6],
  ],
  ECHO: [
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  STOP: [
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1],
  ],
  NICE: [
    [4, 3],
    [5, 4],
    [6, 5],
    [7, 6],
  ],
  PRO: [
    [4, 1],
    [5, 2],
    [6, 3],
  ],
  RAMBO: [
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
  ],
  OSBORN: [
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],
  CEO: [
    [6, 5],
    [5, 6],
    [4, 7],
  ],
  SHIELD: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  RANDOMLY: [
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
  ],
  ANNIE: [
    [1, 7],
    [1, 6],
    [1, 5],
    [1, 4],
    [1, 3],
  ],
};

const PawnWordSearch = () => {
  return (
    <WordSearch
      letters={letters}
      words={words}
      strikeThroughTracking={strikeThroughTracking}
    />
  );
};

export default PawnWordSearch;
