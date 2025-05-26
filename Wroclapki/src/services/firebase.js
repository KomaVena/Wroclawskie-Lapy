import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBllTeyd29eNzSTlNrLlBa5p9fIAgHQCag",
  authDomain: "wroclapki.firebaseapp.com",
  projectId: "wroclapki",
  storageBucket: "wroclapki.firebasestorage.app",
  messagingSenderId: "853634548081",
  appId: "1:853634548081:web:8e1f0be490c9c34df4b6d0",
  measurementId: "G-GSGRN80707"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
