import { useState, createContext, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useToggle } from "./useToggle";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loadedAuth = useToggle();

  useEffect(() => {
    ipcRenderer.send("fetch-user");
    ipcRenderer.on("fetch-user-reply", (event, newUser) => {
      setUser(newUser);
      loadedAuth.setOn();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  const value = {
    user,
    loadedAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
