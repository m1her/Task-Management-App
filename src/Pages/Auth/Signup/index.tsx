import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";
import {
  signupCheckPathTransition,
  signupCheckPathVarients,
  signupCheckVarients,
} from "./animation";
import { Input } from "../../../Components/Input";
import { object } from "../../../utils/ValidateErrors";
import { auth, db } from "../../../Firebase/firebase-config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: any }>({
    email: "",
    password: "",
  });

  const [isSubmeted, setIsSubmeted] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
      password: ["string", "required", "min=6"],
    });
    const result = userSchema.validate(signupData);
    setErrors(result.errors);
    setButtonIsDisabled(true);
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
      });
      setButtonIsDisabled(false);
    }, 2000);
    return result.valid;
  }, [signupData]);

  const signupAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        setIsLoading(true);
        setButtonIsDisabled(true);
        createUserWithEmailAndPassword(
          auth,
          signupData.email,
          signupData.password
        )
          .then(() => {
            setIsSubmeted("true");
            setIsLoading(false);
            const docRef = doc(db, signupData.email, "empty");
            setDoc(docRef, {});
            // addDoc(collection(db, signupData.email), {});
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          })
          .catch((err) => {
            handleFirebaseError(err);
            setIsLoading(false);
            setButtonIsDisabled(false);
          });
      }
    },
    [navigate, signupData.email, signupData.password, validate]
  );

  const handleFirebaseError = (err: any) => {
    let errorMessage = "An error occurred";
    if (err.code) {
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Operation not allowed. Please contact support.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
        default:
          errorMessage = "An unknown error occurred. Please try again.";
          break;
      }
    }
    setErrors({ email: errorMessage, password: "" });
  };

  const facebockSignup = () => {
    const facebockProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebockProvider);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((loggedUser) => {
        const docRef = doc(db, loggedUser.user.email || "", "empty");
        setDoc(docRef, {});
      })
      .then(() => navigate("/dashboard"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-title">Task Manager</div>
        <div className="flex items-center gap-x-2 mt-4">
          <AnimatePresence>
            {isSubmeted === "true" && (
              <motion.div
                key="modal"
                className="signup-checkbox"
                variants={signupCheckVarients}
                initial={signupCheckVarients.initial}
                animate={signupCheckVarients.animate}
                exit={signupCheckVarients.exit}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="text-white w-8 h-8"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                    variants={signupCheckPathVarients}
                    initial={signupCheckPathVarients.initial}
                    animate={
                      isSubmeted === "true"
                        ? signupCheckPathVarients.animateTrue
                        : signupCheckPathVarients.animate
                    }
                    transition={signupCheckPathTransition}
                  />
                </motion.svg>
              </motion.div>
            )}

            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="My Email"
              onChange={handleChange}
              value={signupData?.email}
              error={errors?.email}
              errorMsg={errors?.email}
              autoFocus
            />
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-x-2 mt-4">
          <AnimatePresence>
            {isSubmeted === "true" && (
              <motion.div
                key="modal"
                className="signup-checkbox"
                variants={signupCheckVarients}
                initial={signupCheckVarients.initial}
                animate={signupCheckVarients.animate}
                exit={signupCheckVarients.exit}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="text-white w-8 h-8"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                    variants={signupCheckPathVarients}
                    initial={signupCheckPathVarients.initial}
                    animate={
                      isSubmeted === "true"
                        ? signupCheckPathVarients.animateTrue
                        : signupCheckPathVarients.animate
                    }
                    transition={signupCheckPathTransition}
                  />
                </motion.svg>
              </motion.div>
            )}

            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="My Password"
              value={signupData?.password}
              onChange={handleChange}
              error={errors?.password}
              errorMsg={errors?.password}
            />
          </AnimatePresence>
        </div>
        <button
          className="signup-submit-button"
          onClick={signupAction}
          disabled={buttonIsDisabled}
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="signup-loading"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            "Signup"
          )}
        </button>
        <div className="text-sm font-medium mt-1">
          Already have an account?{" "}
          <a href="/login" className="signup-login-link">
            Login
          </a>
        </div>
        <div className="signup-divider"></div>
        <div className="flex gap-x-8">
          <button
            type="button"
            className="signup-facebook-btn"
            onClick={facebockSignup}
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="signup-google-btn"
            onClick={googleSignIn}
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
