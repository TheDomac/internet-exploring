export const env = process.env.REACT_APP_STAGE.toUpperCase();

export const build = process.env.REACT_APP_BUILD;

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

export const REDDIT_PROFILE_URL = "https://www.reddit.com/user/TheDomac";

export const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/internetexploring";

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

export const statuses = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};

export const PRICE = "$4.99";
