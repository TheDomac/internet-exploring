export const env = process.env.REACT_APP_STAGE.toUpperCase();

export const workshopCollectionName = "workshopPuzzles";
export const clueTypes = {
  TEXT: "text",
  IMAGE: "image",
  CUSTOM_COMPONENT: "customComponent",
  NONE: null,
};

export const solutionTypes = {
  TEXT: "text",
  DATE: "date",
  CUSTOM_COMPONENT: "customComponent",
};

export const REDDIT_URL = "https://www.reddit.com/r/internetexploring/";
export const REDDIT_MY_PROFILE = "https://www.reddit.com/user/TheDomac";

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
  USER_SOCIAL_MEDIA_URL: "userSocialMediaURL",
  WORKSHOP_SOLVED_PUZZLES_IDS: "workshopSolvedPuzzlesIDs",
};

export const statuses = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};
