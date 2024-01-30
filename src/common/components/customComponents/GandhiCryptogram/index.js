import React from "react";

import Cryptogram from "../Cryptogram";

const SOLUTION =
  "Be the change that you wish to see in the world.";
const solutionAsSymbols = SOLUTION.toUpperCase().split("");
const solutionAsWords = SOLUTION.toUpperCase()
  .split(" ")
  .map((word) => word.split(""));

const hash = {
  A: "Q",
  B: "J",
  C: "Y",
  D: "Z",
  E: "P",
  F: "F",
  G: "K",
  H: "B",
  I: "E",
  J: "T",
  K: "H",
  L: "C",
  M: "A",
  N: "N",
  O: "G",
  P: "Y",
  R: "O",
  S: "U",
  T: "W",
  U: "I",
  V: "S",
  Z: "O",
  X: "R",
  Y: "L",
  Q: "D",
  W: "X",
};

const GandhiCryptogram = (props) => {
  return (
    <Cryptogram {...props} hash={hash} solution={SOLUTION} solutionAsSymbols={solutionAsSymbols} solutionAsWords={solutionAsWords} />
  );
};

export default GandhiCryptogram;
