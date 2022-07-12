export const workshopCollectionName =
  process.env[
    `REACT_APP_COLLECTION_${process.env.REACT_APP_STAGE.toUpperCase()}`
  ];
export const toBeDeletedCollectionName =
  process.env[
    `REACT_APP_TO_BE_DELETED_${process.env.REACT_APP_STAGE.toUpperCase()}`
  ];

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

export const CATEGORIES = {
  GENERAL: "general",
};
