import React, { useState, createContext } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

import { provider, auth,
  //  db
   } from "../firebase";
// import { useToggle } from "./useToggle";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Enable commented for patreon user check
  // const isPatreonUser = useToggle();

  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    // if (currentUser) {
    //   try {
    //     const docRef = doc(db, "patreonUsers", currentUser.uid);
    //     const docSnap = await getDoc(docRef);
    //     const patreonUser = docSnap.data();
    //     if (patreonUser.uid) {
    //       isPatreonUser.setOn();
    //     } else {
    //       isPatreonUser.setOff();
    //     }
    //   } catch (err) {
    //     isPatreonUser.setOff();
    //   }
    // }
  });

  const handleLoginClick = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogOutClick = async () => {
    await signOut(auth);
  };

  const value = { user, handleLoginClick, handleLogOutClick, /*isPatreonUser*/ };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
