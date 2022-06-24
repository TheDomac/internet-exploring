const cleanUp = (puzzle) => {
  return {
    ...puzzle,
    rebuses: puzzle.rebuses.map((rebus) => ({
      ...rebus,
      solutionInfo: {
        ...rebus.solutionInfo,
        possibleSolutions: rebus.solutionInfo.possibleSolutions.filter(
          (ps) => ps.value
        ),
      },
      clues: rebus.clues.map((clue) => ({
        ...clue,
        solutionInfo: {
          ...clue.solutionInfo,
          solvedText:
            clue.solutionInfo.possibleSolutions.length > 0
              ? clue.solutionInfo.solvedText
              : "",
          possibleSolutions: clue.solutionInfo.possibleSolutions.filter(
            (ps) => ps.value
          ),
        },
        dependsOn: clue.dependsOn.filter((d) => d.value),
      })),
    })),
  };
};

export default cleanUp;
