const isWidthNumber = (widthValue) => {
  const value = widthValue.slice(5).split("%")[0];
  const number = Number(value);
  return number >= 1 && number <= 100;
};

const validate = (puzzle) => {
  if (!puzzle.name) return "Riddle group needs to have a name.";
  if (puzzle.rebuses.length < 1 || puzzle.rebuses.length > 10)
    return "Riddle group needs to have between 1 and 10 riddles.";
  if (!puzzle.rebuses.every((r) => r.solutionInfo.solvedText))
    return "Every riddle needs to have a solved text.";
  if (!puzzle.rebuses.every((r) => r.clues.length > 0))
    return "Every riddle needs to have at least one clue.";
  if (
    !puzzle.rebuses.every(
      (r) =>
        r.solutionInfo.possibleSolutions.length > 0 ||
        r.clues.find((c) => c.solutionInfo.possibleSolutions.length > 0)
    )
  )
    return "Every riddle needs to have a possible solution or at least one clue with a possible solution.";
  if (
    !puzzle.rebuses.every((r) => r.clues.every((c) => c.clueValues.length > 0))
  )
    return "Every clue needs to have at least one subclue.";
  if (
    !puzzle.rebuses.every((r) =>
      r.clues.every(
        (c) =>
          isWidthNumber(c.style.width) &&
          c.clueValues.every((cv) => isWidthNumber(cv.style.width))
      )
    )
  )
    return "Every width value needs to be a number between 1 and 100.";
  if (
    !puzzle.rebuses.every((r) =>
      r.clues.every(
        (c) =>
          c.solutionInfo.possibleSolutions.length === 0 ||
          (c.solutionInfo.possibleSolutions.length > 0 &&
            c.solutionInfo.solvedText)
      )
    )
  )
    return "Every riddle and clue with a possible solution needs to have a solved text.";

  return null;
};

export default validate;
