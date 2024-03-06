import React from "react";

import Cryptogram from "../Cryptogram";

const SOLUTION =
  "The best and most beautiful things in the world cannot be seen or even touched. They must be felt with the heart.";
const solutionAsSymbols = SOLUTION.toUpperCase().split("");
const solutionAsWords = SOLUTION.toUpperCase()
  .split(" ")
  .map((word) => word.split(""));

const hash = {
  A: "S",
  B: "B",
  C: "E",
  D: "H",
  E: "T",
  F: "X",
  G: "K",
  H: "J",
  I: "P",
  J: "Z",
  K: "Y",
  L: "V",
  M: "C",
  N: "R",
  O: "W",
  P: "G",
  R: "L",
  S: "F",
  T: "I",
  U: "U",
  V: "O",
  Z: "M",
  X: "D",
  Y: "N",
  Q: "A",
  W: "Q",
};

const HelenKellerCryptogram = (props) => {
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

export default HelenKellerCryptogram;
