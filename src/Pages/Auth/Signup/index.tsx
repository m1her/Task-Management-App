import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";
import {
  signupCheckPathTransition,
  signupCheckPathVarients,
  signupCheckVarients,
} from "./animation";
import { Input } from "../../../Components/Input";
import { object } from "../../../utils/ValidateErrors";

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
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
      });
    }, 2000);
    return result.valid;
  }, [signupData]);

  const signupAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        console.log(signupData);
        setIsSubmeted("true");
      }
    },
    [signupData, validate]
  );

  // useEffect(() => {
  //   validate();
  // }, [signupData, validate]);

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
        <button className="signup-submit-button" onClick={signupAction}>
          Signup
        </button>
        <div className="text-sm font-medium mt-1">
          Already have an account? <span className="text-[#3B82F6]">Login</span>
        </div>
        <div className="signup-divider"></div>
        <div className="flex gap-x-8">
          <button
            type="button"
            className="text-white w-full transition-colors bg-[#3b5998] hover:bg-[#3b5998]/90 outline-none font-medium rounded text-sm p-3 flex items-center justify-center"
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
            className="text-white transition-colors bg-[#4285F4] hover:bg-[#4285F4]/90 outline-none rounded p-3 flex justify-center items-center w-full"
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
