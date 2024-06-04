import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD45VblAMChTIZQrr6lC8hvM3MOkoOr_-o",
  authDomain: "rebus-5141f.firebaseapp.com",
  projectId: "rebus-5141f",
  storageBucket: "rebus-5141f.appspot.com",
  messagingSenderId: "875271177739",
  appId: "1:875271177739:web:4d77ab869db696866de90e",
  measurementId: "G-VWKZZNY9WR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();

export const storage = getStorage();

export const auth = getAuth();


export const testAdd = async () => {
  try {
    await setDoc(doc(db, "competitivePuzzles", "testPuzzleId"), {puzzles: ["wat"]});
  } catch (error) {
    console.log("error", error)
  }

}