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

const PawnWordSearch = () => {
  return <WordSearch letters={letters} words={words} />;
};

export default PawnWordSearch;
