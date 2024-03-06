import React from "react";

import Cryptogram from "../Cryptogram";

const SOLUTION =
  "Life is like a box of chocolates. You never know what you're gonna get.";
const solutionAsSymbols = SOLUTION.toUpperCase().split("");
const solutionAsWords = SOLUTION.toUpperCase()
  .split(" ")
  .map((word) => word.split(""));

const hash = {
  A: "L",
  B: "M",
  C: "J",
  D: "D",
  E: "P",
  F: "Z",
  G: "Q",
  H: "G",
  I: "W",
  J: "R",
  K: "V",
  L: "N",
  M: "U",
  N: "Y",
  O: "T",
  P: "H",
  R: "C",
  S: "X",
  T: "O",
  U: "B",
  V: "A",
  Z: "K",
  X: "S",
  Y: "E",
  Q: "F",
  W: "I",
};

const ForrestGumpCryptogram = (props) => {
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

export default ForrestGumpCryptogram;
