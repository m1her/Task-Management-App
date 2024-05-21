// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGsHz5v-wFQ8ZMkiiv7IjcGTnL0qitnRE",
  authDomain: "task-management-app-13316.firebaseapp.com",
  projectId: "task-management-app-13316",
  storageBucket: "task-management-app-13316.appspot.com",
  messagingSenderId: "867657670664",
  appId: "1:867657670664:web:e00b1c89beef3712b1b1bd",
  measurementId: "G-SVK9T93L1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);