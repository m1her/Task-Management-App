import React, { useState } from "react";
import { motion } from "framer-motion";

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
    setIsChecked("true");
    setTimeout(() => {
      setIsChecked("none");
    }, 5000);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <motion.div
        className="relative p-4 w-[400px] h-[400px] overflow-hidden border-2 rounded-md border-[#E5E7EB] shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)] transition-colors duration-500 ease-in-out"
        initial={{ width: 20, height: 20, backgroundColor: "white" }}
        animate={{
          rotate: 360,
          width: 400,
          height: 400,
          x: isChecked === "true" ? -400 : 0,
          boxShadow:
            isChecked === "wrong"
              ? "inset 0 0 20px 10px rgba(239,68,68,0.6)"
              : "inset 0 0 20px 10px rgba(255,255,255,0)",
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 100,
            duration: 0.3,
          },
          height: {
            type: "spring",
            stiffness: 100,
            duration: 0.3,
          },
          rotate: {
            duration: 0.4,
            ease: "linear",
          },
          x: {
            duration: 0.4,
            type: "spring",
            stiffness: 50,
          },
        }}
      >
        <motion.div className="absolute top-0 left-0 w-full h-full z-50 bg-white"
        animate={{
          opacity: 0,
          display: "none"
        }}
        transition={{duration: 0.3, delay: 0.5}}
        ></motion.div>
        <div
          className={`text-[42px] font-extralight text-center p-4 transition-colors duration-300 
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
          <div className="border-t border-[#E5E7EB] w-full h-[1px] my-7"></div>
          <button
            type="button"
            className="text-white w-full transition-colors bg-[#3b5998] hover:bg-[#3b5998]/90 outline-none font-medium rounded text-sm px-5 py-2.5 flex justify-center mb-4"
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
            className="w-full h-full flex justify-center items-center"
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
          className="relative text-[64px] font-extralight text-[#3B82F6] transition-colors duration-700"
          initial={{ opacity: 0, display: "none", }}
          animate={{
            opacity: isChecked === "true" ? 1 : 0,
            color: isChecked === "true" ? "grey" : "#3B82F6",
            display: isChecked === "true" ? "inline" : "none",
          }}
          transition={{
            opacity: { duration: 0.2, delay: 0.8 },
            color: { duration: 1, delay: 1.3, ease: "linear" },
          }}
        >
          Logged In Successfully
          <motion.div
            className="absolute top-1/2 translate-y-1/2 border-t-[3px] rounded w-full h-[1px] transition-colors duration-700"
            animate={{
              width: isChecked === "true" ? `100%` : 0,
              borderColor: isChecked === "true" ? "grey" : "#3B82F6",
            }}
            transition={{
              width: { duration: 0.6, delay: 1.2 },
              borderColor: { duration: 0.6, delay: 1.3, ease: "linear" },
            }}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};
