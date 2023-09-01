const getIsSolved = (puzzleSolvingState, rebusIndex) => {
  const rebusInPuzzleSolvingState = puzzleSolvingState[rebusIndex];
  const rebusSolvedSolution = rebusInPuzzleSolvingState.solution;

  const cluesSolvedSolution =
    rebusInPuzzleSolvingState.solution === undefined &&
    Object.keys(rebusInPuzzleSolvingState.clues).every(
      (key) => rebusInPuzzleSolvingState.clues[key],
    );

  return {
    cluesSolvedSolution,
    rebusSolvedSolution,
  };
};

export default getIsSolved;
