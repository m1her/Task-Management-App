import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";

export const facebockSignup = () => {
  const facebockProvider = new FacebookAuthProvider();
  signInWithPopup(auth, facebockProvider);
};
