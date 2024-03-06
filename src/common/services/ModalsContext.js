import React, { createContext } from "react";
import { useToggle } from "./useToggle";

export const ModalsContext = createContext();

const ModalsProvider = ({ children }) => {
  const upgradeModal = useToggle();

  const value = { upgradeModal };

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
};

export default ModalsProvider;
