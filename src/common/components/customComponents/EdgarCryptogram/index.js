import React, { useState, useEffect } from "react";


import { useToggle } from "../../../services/useToggle";
import CopyableText from "../../Clue/CopyableText";
import Sentence from "./Sentence";
import Keyboard from "./Keyboard";
import { FadeInDiv } from "../../FadeIn";

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

const initialLetters = {
  A: null,
  B: null,
  C: null,
  D: null,
  E: null,
  F: null,
  G: null,
  H: null,
  I: null,
  J: null,
  K: null,
  L: null,
  M: null,
  N: null,
  O: null,
  P: null,
  R: null,
  S: null,
  T: null,
  U: null,
  V: null,
  Z: null,
  X: null,
  Y: null,
  Q: null,
  W: null,
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

const EdgarCryptogram = ({
  id,
  markAsSolved,
  solved,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const [letters, setLetters] = useState(
    stateMaintenanceValue || initialLetters
  );
  const [selectedHashedLetter, setSelectedHashLetter] = useState(null);
  const finished = useToggle(solved);

  useEffect(() => {
    const test = solutionAsSymbols.map((symbol) =>
      hash[symbol] !== undefined ? letters[hash[symbol]] : symbol
    );
    const isSame = test.every((symbol, i) => symbol === solutionAsSymbols[i]);
    if (isSame) {
      finished.setOn();
      markAsSolved(id, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters]);

  const handleLetterClick = (e) => {
    if (!selectedHashedLetter) return;

    const newLetterValue = e.target.name === "_" ? null : e.target.name;
    const newLetters = {
      ...letters,
      [selectedHashedLetter]: newLetterValue,
    };

    setLetters(newLetters);
    updateMaintenance(id, newLetters);
    setSelectedHashLetter(null);
  };

  const handleLetterSelect = (letter) => () => {
    if (!hash[letter]) {
      return;
    }
    setSelectedHashLetter(letter);
  };

  if (finished.isOn) {
    return (
      <FadeInDiv
        style={{ maxWidth: "30%", textAlign: "center", margin: "0 auto" }}
      >
        <CopyableText text={SOLUTION} />
        <CopyableText fontSize="16px" text="Quote author" />
      </FadeInDiv>
    );
  }

  return (
    <>
      <Sentence
        solutionAsWords={solutionAsWords}
        letters={letters}
        selectedHashedLetter={selectedHashedLetter}
        handleLetterSelect={handleLetterSelect}
        hash={hash}
      />
      <Keyboard
        handleLetterClick={handleLetterClick}
        letters={letters}
        hash={hash}
      />
    </>
  );
};

export default EdgarCryptogram;
