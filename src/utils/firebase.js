// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9nYWShOwl4fO9pCjrD-Rb0ZU9BtR5EEI",
  authDomain: "netflixgpt-3b824.firebaseapp.com",
  projectId: "netflixgpt-3b824",
  storageBucket: "netflixgpt-3b824.firebasestorage.app",
  messagingSenderId: "423930001996",
  appId: "1:423930001996:web:50409de0e9afa5a90dd2e9",
  measurementId: "G-F48BFN967V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
