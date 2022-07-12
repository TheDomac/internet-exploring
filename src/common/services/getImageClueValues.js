import { clueTypes } from "../consts";

const getImageClueValues = (rebuses) =>
  rebuses.reduce((pr, rebus) => {
    const clues = rebus.clues.reduce((pc, clue) => {
      const clueValues = clue.clueValues
        .filter((clueValue) => clueValue.type === clueTypes.IMAGE)
        .reduce((pcv, clueValue) => pcv.concat(clueValue), []);
      return pc.concat(clueValues);
    }, []);
    return pr.concat(clues);
  }, []);

export default getImageClueValues;
