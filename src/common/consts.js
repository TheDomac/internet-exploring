export const clueTypes = {
  TEXT: "text",
  IMAGE: "image",
  CUSTOM_COMPONENT: "customComponent",
};

export const solutionTypes = {
  TEXT: "text",
  DATE: "date",
  CUSTOM_COMPONENT: "customComponent",
};

export const projects = {
  PROMO: "promo",
  ELECTRON: "electron",
};

export const DEFAULT_SOLUTION_VALUES = {
  [solutionTypes.TEXT]: "",
  [solutionTypes.CUSTOM_COMPONENT]: "",
  [solutionTypes.DATE]: {
    place: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "",
  },
};

export const LOCAL_STORAGE_KEYS = {
  SOLVED_PUZZLES: "solvedPuzzles",
  ARE_ANSWERS_HIDDEN: "areAnswersHidden",
  USER_NICKNAME: "userNickname",
};
