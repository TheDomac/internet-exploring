import React, { useState, createContext, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { provider, auth } from "../firebase";
// import { useToggle } from "./useToggle";
import { statuses } from "../consts";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(statuses.IDLE);
  const [logInStatus, setLogInStatus] = useState(statuses.IDLE);
  const [passwordResetStatus, setPasswordResetStatus] = useState(statuses.IDLE);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleGoogleLoginClick = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogOutClick = async () => {
    await signOut(auth);
  };

  const registerUser = async (email, password) => {
    try {
      setRegistrationStatus(statuses.LOADING);
      await createUserWithEmailAndPassword(auth, email, password);
      setRegistrationStatus(statuses.SUCCESS);
    } catch (e) {
      setRegistrationStatus(statuses.ERROR);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLogInStatus(statuses.LOADING);
      await signInWithEmailAndPassword(auth, email, password);
      setLogInStatus(statuses.SUCCESS);
    } catch (e) {
      setLogInStatus(statuses.ERROR);
    }
  };

  const resetPassword = async (email) => {
    try {
      setPasswordResetStatus(statuses.LOADING);
      await sendPasswordResetEmail(auth, email);
      setPasswordResetStatus(statuses.SUCCESS);
    } catch (e) {
      setPasswordResetStatus(statuses.ERROR);
    }
  };

  const value = {
    user,
    handleGoogleLoginClick,
    handleLogOutClick,
    registerUser,
    loginUser,
    logInStatus,
    registrationStatus,
    resetPassword,
    passwordResetStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
