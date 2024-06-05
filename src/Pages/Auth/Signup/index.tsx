import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";
import {
  signupCheckPathTransition,
  signupCheckPathVarients,
  signupCheckVarients,
} from "./animation";
import { object } from "../../../utils/ValidateErrors";
import { auth, db } from "../../../Firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { SignupFirebaseErrorHandler } from "../../../utils/SignupFirebaseErrorHandler";
import { googleSignIn } from "../../../utils/GoogleSignin";
import { facebockSignup } from "../../../utils/FacebookSignin";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button, Input } from "../../../Components";

export const Signup = () => {
  const [signupData, setSignupData] = useState<{ [k: string]: any }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: any }>({
    email: "",
    password: "",
  });

  const [isSubmeted, setIsSubmeted] = useState<boolean>(false);
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
            setIsSubmeted(true);
            setIsLoading(false);
            const docRef = doc(db, signupData.email, "empty");
            setDoc(docRef, {});
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          })
          .catch((err) => {
            setIsLoading(false);
            setButtonIsDisabled(false);
            SignupFirebaseErrorHandler({ err, setErrors });
          });
      }
    },
    [navigate, signupData.email, signupData.password, validate]
  );

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-title">Task Manager</div>
        <div className="flex items-center gap-x-2 mt-4">
          <AnimatePresence>
            {isSubmeted && (
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
                      isSubmeted
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
            {isSubmeted && (
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
                      isSubmeted
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
        <Button
          styles="signup-submit-button"
          onClick={signupAction}
          disabled={buttonIsDisabled}
          isLoading={isLoading}
          label="Signup"
        />
        <div className="text-sm font-medium mt-1">
          Already have an account?{" "}
          <a href="/login" className="signup-login-link">
            Login
          </a>
        </div>
        <div className="signup-divider"></div>
        <div className="flex gap-x-8">
          <Button
            styles="signup-facebook-btn"
            icon={faFacebookF}
            labelStyles="hidden"
            onClick={facebockSignup}
          />
          <Button
            styles="signup-google-btn"
            icon={faGoogle}
            labelStyles="hidden"
            onClick={() => googleSignIn(navigate)}
          />
        </div>
      </div>
    </div>
  );
};
