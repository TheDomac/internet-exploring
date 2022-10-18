
import React from "react";
import { FadeInSvg } from "./FadeIn"

const Check = () => {
  return (
    <FadeInSvg
      style={{
        animationDelay: "0.5s"
      }}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="CheckCircleIcon"
      fill="white"
      width="20px"
      height="20px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </FadeInSvg>
  );
};

export default Check;
