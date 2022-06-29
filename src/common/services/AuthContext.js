import React, { useState, createContext } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import { provider, auth } from "../firebase";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
  });

  const handleLoginClick = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogOutClick = async () => {
    await signOut(auth);
  };

  const value = { user, handleLoginClick, handleLogOutClick };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
