import React, { useState } from "react";
import styled from "styled-components";

import Circled from "./Circled.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  background: white;
  border-radius: 3px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Cell = styled.div`
  width: 47px;
  height: 47px;
  color: #082347;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: 300ms;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  height: 45px;
  transition: 300ms;
  opacity: ${({ shown }) => (shown ? "1" : "0")};
`;

const Word = styled.div`
  cursor: pointer;
  ${({ done }) => (done ? "text-decoration: line-through 3px #186c4a; " : "")}
`;

const WordWrapper = styled.div`
  position: absolute;
  left: 400px;
`;

const generateLettersClickedArray = (array) =>
  new Array(array.length).fill(new Array(array[0].length).fill(false));

const WordSearch = ({ letters, words, strikeThroughTracking }) => {
  const [circledLetters, setCircledLetters] = useState(
    generateLettersClickedArray(letters),
  );

  const handleLetterClick = (i, j) => () => {
    const newCircledLetters = circledLetters.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((isCircled, letterIndex) =>
            letterIndex === j ? !isCircled : isCircled,
          )
        : row,
    );

    setCircledLetters(newCircledLetters);
  };

  return (
    <Wrapper>
      <Grid>
        {letters.map((row, i) =>
          row.map((letter, j) => (
            <Cell key={`${i}-${j}`} onClick={handleLetterClick(i, j)}>
              {letter}
              <Image src={Circled} alt="circled" shown={circledLetters[i][j]} />
            </Cell>
          )),
        )}
      </Grid>
      <WordWrapper>
        {words.map((word, i) => {
          const isDone = strikeThroughTracking[word].every(
            ([y, x]) => circledLetters[y][x],
          );
          return (
            <Word done={isDone} key={word}>
              {word}
            </Word>
          );
        })}
      </WordWrapper>
    </Wrapper>
  );
};

export default WordSearch;
