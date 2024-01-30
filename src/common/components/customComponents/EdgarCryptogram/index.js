import React from "react";

import Cryptogram from "../Cryptogram";

const SOLUTION =
  "There is no exquisite beauty without some strangeness in the proportion.";
const solutionAsSymbols = SOLUTION.toUpperCase().split("");
const solutionAsWords = SOLUTION.toUpperCase()
  .split(" ")
  .map((word) => word.split(""));

const hash = {
  A: "Q",
  B: "P",
  C: "X",
  D: "Y",
  E: "L",
  F: "W",
  G: "T",
  H: "M",
  I: "R",
  J: "A",
  K: "B",
  L: "V",
  M: "H",
  N: "G",
  O: "Z",
  P: "E",
  R: "J",
  S: "N",
  T: "F",
  U: "C",
  V: "D",
  Z: "O",
  X: "S",
  Y: "K",
  Q: "I",
  W: "U",
};

// ENABLE THIS FOR ALMOST SOLVED
// const initialLetters = {
//   A: "A",
//   B: "A",
//   C: "U",
//   D: "A",
//   E: null,
//   F: "T",
//   G: "N",
//   H: "M",
//   I: "Q",
//   J: "R",
//   K: "Y",
//   L: "E",
//   M: "H",
//   N: "S",
//   O: "A",
//   P: "B",
//   R: "I",
//   S: "X",
//   T: "G",
//   U: "W",
//   V: "A",
//   Z: "O",
//   X: "X",
//   Y: "A",
//   Q: "A",
//   W: "A",
// };

const EdgarCryptogram = (props) => {
  return (
    <Cryptogram {...props} hash={hash} solution={SOLUTION} solutionAsSymbols={solutionAsSymbols} solutionAsWords={solutionAsWords} />
  );
};

export default EdgarCryptogram;
