import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider }from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2rKTkh-MrLMUpi4xDTbUrIVkQaeIQSiI",
  authDomain: "sultan-87e07.firebaseapp.com",
  projectId: "sultan-87e07",
  storageBucket: "sultan-87e07.appspot.com",
  messagingSenderId: "256277427073",
  appId: "1:256277427073:web:3046061b871270715eee80"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);