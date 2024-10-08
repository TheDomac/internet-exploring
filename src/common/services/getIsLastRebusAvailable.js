import getIsSolved from "./getIsSolved";

const getIsLastRebusAvailable = (puzzleSolvingState, lastRebus) => {
  if (lastRebus.isUnlocked) {
    return true;
  }

  const arePreviousRebusesSolved = puzzleSolvingState.every((r, i) => {
    if (i === puzzleSolvingState.length - 1) {
      return true;
    }

    const { cluesSolvedSolution, rebusSolvedSolution } = getIsSolved(
      puzzleSolvingState,
      i,
    );
    return Boolean(cluesSolvedSolution || rebusSolvedSolution);
  });

  return arePreviousRebusesSolved;
};

export default getIsLastRebusAvailable;
