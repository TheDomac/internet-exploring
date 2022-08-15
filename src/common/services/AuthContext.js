import React, { useState, createContext } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import {
  googleProvider,
  auth,
} from "../firebase";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
  });

  const handleGoogleLoginClick = async () => {
    try {
      console.log("starting")
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log("dafuq")
      console.log(err)
    }
  };

  const handleStandardLoginClick = () => {

  }

  const handleLogOutClick = async () => {
    await signOut(auth);
  };

  const value = { user, handleGoogleLoginClick, handleStandardLoginClick, handleLogOutClick };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
