// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fc40e.firebaseapp.com",
  projectId: "mern-estate-fc40e",
  storageBucket: "mern-estate-fc40e.appspot.com",
  messagingSenderId: "932929793975",
  appId: "1:932929793975:web:db4cfb206517562ce70232"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);