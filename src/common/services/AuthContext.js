import { useState, createContext, useEffect } from "react";
import { ipcRenderer } from "electron";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect( () => {
        ipcRenderer.send("fetch-user");
    }, [])

    ipcRenderer.on("fetch-user-reply", (event, newUser) => {

        setUser(newUser)
        
        });

  const value = {
    user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
