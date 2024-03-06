import React from "react";

import Cryptogram from "../Cryptogram";

const SOLUTION = "To be or not to be, that is the question.";
const solutionAsSymbols = SOLUTION.toUpperCase().split("");
const solutionAsWords = SOLUTION.toUpperCase()
  .split(" ")
  .map((word) => word.split(""));

const hash = {
  A: "C",
  B: "X",
  C: "Y",
  D: "L",
  E: "K",
  F: "J",
  G: "G",
  H: "F",
  I: "D",
  J: "P",
  K: "Z",
  L: "W",
  M: "U",
  N: "Q",
  O: "S",
  P: "I",
  R: "A",
  S: "H",
  T: "N",
  U: "R",
  V: "E",
  Z: "B",
  X: "O",
  Y: "T",
  Q: "M",
  W: "V",
};

const ShakespeareCryptogram = (props) => {
  return (
    <Cryptogram
      {...props}
      hash={hash}
      solution={SOLUTION}
      solutionAsSymbols={solutionAsSymbols}
      solutionAsWords={solutionAsWords}
    />
  );
};

export default ShakespeareCryptogram;
