import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

import firebaseConfig from "./firebaseConfig";

export const provider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();

export const storage = getStorage();
