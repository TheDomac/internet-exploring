export const env = process.env.REACT_APP_STAGE.toUpperCase();

export const workshopCollectionName =
  process.env[`REACT_APP_COLLECTION_${env}`];

export const toBeDeletedCollectionName =
  process.env[`REACT_APP_TO_BE_DELETED_${env}`];

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

export const RIDDLE_STATUSES = {
  DRAFT: "draft",
  DONE: "done",
  NEEDS_APPROVAL: "needs_approval",
  DENIED: "denied",
};

export const RIDDLE_STATUSES_TITLES = {
  [RIDDLE_STATUSES.DRAFT]: "Draft",
  [RIDDLE_STATUSES.DONE]: "Approved",
  [RIDDLE_STATUSES.NEEDS_APPROVAL]: "Waiting for approval",
  [RIDDLE_STATUSES.DENIED]: "Rejected",
};

export const statuses = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};
