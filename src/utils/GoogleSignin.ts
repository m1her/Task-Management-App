import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";

export const googleSignIn = ( navigate: NavigateFunction) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((loggedUser) => {
      const docRef = doc(db, loggedUser.user.email || "", "empty");
      setDoc(docRef, {});
    })
    .then(() => navigate("/dashboard"))
    .catch((err) => console.log(err));
};
