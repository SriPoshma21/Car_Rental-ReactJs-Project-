import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN-ornitJyLO23qizTku1O4RBEYRQADwo",
  authDomain: "tours-and-travels-auth.firebaseapp.com",
  projectId: "tours-and-travels-auth",
  storageBucket: "tours-and-travels-auth.firebasestorage.app",
  messagingSenderId: "280198826056",
  appId: "1:280198826056:web:71258100f66d43c641707d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
