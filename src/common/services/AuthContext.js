import React, { useState, createContext } from "react";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";

import { provider } from "../firebase";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const handleLoginClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogOutClick = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const value = { user, handleLoginClick, handleLogOutClick };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
