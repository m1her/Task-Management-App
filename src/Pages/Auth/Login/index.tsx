import React, { useState } from "react";
import { motion } from "framer-motion";
import "./style.css";
import {
  loginCardTRansitions,
  loginCardVarients,
  loginHidingCardTransition,
  loginHidingCardVarients,
  loginSuccessfulMessageStrokeTransition,
  loginSuccessfulMessageStrokeVarients,
  loginSuccessfulMessageTransition,
  loginSuccessfulMessageVarients,
} from "./animation";

export const Login = () => {
  const [email, setEmail] = useState("asdasd");
  const [password, setPassword] = useState("asdasd");
  const [isChecked, setIsChecked] = useState("none");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  const handleSubmit = () => {
    setIsChecked("wrong");
    setTimeout(() => {
      setIsChecked("none");
    }, 500);
  };
  return (
    <div className="login-page-container">
      <motion.div
        className="login-card"
        variants={loginCardVarients}
        initial={loginCardVarients.initial}
        animate={
          isChecked === "true"
            ? loginCardVarients.animateTrue
            : isChecked === "wrong"
            ? loginCardVarients.animateWrong
            : loginCardVarients.animate
        }
        transition={loginCardTRansitions}
      >
        <motion.div
          className="login-hiding-card"
          variants={loginHidingCardVarients}
          animate={loginHidingCardVarients.animate}
          transition={loginHidingCardTransition}
        ></motion.div>
        <div
          className={`login-title
        ${isChecked === "wrong" ? "text-[#EF4444]" : "text-[#3B82F6]"} `}
        >
          Task Manager
        </div>

        <input
          className="border rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-200 p-2 text-base mt-4 border-[#cbcfd6] outline-none"
          placeholder="My Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          className="border rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-200 p-2 text-base mt-4 border-[#cbcfd6] outline-none"
          placeholder="My Password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <div className="w-full text-end text-[#3B82F6] text-sm font-medium mt-1">Forgot Password ?</div>
        <motion.button
          onClick={handleSubmit}
          className={`w-full text-base my transition-colors text-white p-2 font-semibold text-center rounded
          ${
            isChecked === "wrong"
              ? "bg-[#EF4444]"
              : "bg-[#3B82F6] hover:bg-[#4e92ff]"
          } transition-colors duration-300 
          `}
          initial={{ display: "none", opacity: 0 }}
          animate={{
            display: email && password ? "inline" : "none",
            opacity: email && password ? 1 : 0,
            y: email && password ? 62 : 0,
          }}
          transition={{
            display: {
              duration: 0.3,
            },
            opacity: {
              duration: 0.25,
            },
          }}
        >
          Check
        </motion.button>
        <motion.div
          className="absolute w-full pr-8 bottom-4"
          initial={{ y: 0 }}
          animate={{
            y: email && password ? 150 : 0,
            opacity: email && password ? 0 : 1,
          }}
          transition={{
            y: {
              duration: 0.4,
            },
            opacity: {
              duration: 0.3,
            },
          }}
        >
          <div className="border-t border-[#E5E7EB] w-full h-[1px] mt-12 mb-4"></div>
          <button
            type="button"
            className="text-white w-full transition-colors bg-[#3b5998] hover:bg-[#3b5998]/90 outline-none font-medium rounded text-sm px-5 py-2.5 flex justify-center mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            Sign in with Facebook
          </button>
          <button
            type="button"
            className="text-white transition-colors bg-[#4285F4] hover:bg-[#4285F4]/90 outline-none font-medium rounded text-sm px-5 py-2.5 flex justify-center w-full"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </motion.div>

        <div
          className={`absolute top-0 left-0 w-full h-full z-50 ${
            isChecked === "true" ? "inline" : "hidden"
          }`}
        >
          <motion.div
            className="center"
            animate={{
              opacity: isChecked === "true" ? 1 : 0,
              backgroundColor: "#34D399",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-white"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: isChecked === "true" ? 1 : 0,
                  opacity: isChecked === "true" ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute right-52">
        <motion.div
          className="login-successful-message"
          variants={loginSuccessfulMessageVarients}
          initial={loginSuccessfulMessageVarients.initial}
          animate={
            isChecked === "true"
              ? loginSuccessfulMessageVarients.animateTrue
              : loginSuccessfulMessageVarients.animate
          }
          transition={loginSuccessfulMessageTransition}
        >
          Logged In Successfully
          <motion.div
            className="login-successful-message-stroke"
            variants={loginSuccessfulMessageStrokeVarients}
            animate={
              isChecked === "true"
                ? loginSuccessfulMessageStrokeVarients.animateTrue
                : loginSuccessfulMessageStrokeVarients.animate
            }
            transition={loginSuccessfulMessageStrokeTransition}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};
