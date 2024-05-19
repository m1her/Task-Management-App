import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Signup = () => {
  const [email, setEmail] = useState("asdasd");
  const [password, setPassword] = useState("asdasd");
  const [isSubmeted, setIsSubmeted] = useState("true");

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

  const submit = () => {
    setIsSubmeted("true");
    setTimeout(() => {
      setIsSubmeted("none");
    }, 2000);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative p-4 w-[400px] h-[400px] overflow-hidden border-2 rounded-md border-[#E5E7EB] shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)] transition-colors duration-500 ease-in-out bg-white">
        <div className="text-[42px] text-[#3B82F6] font-extralight text-center p-4 transition-colors duration-300">
          Task Manager
        </div>
        <div>
          <input
            className="border rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-200 p-2 text-base mt-4 border-[#cbcfd6] outline-none"
            placeholder="My Email"
            type="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div className="flex items-center gap-x-2 mt-4">
          <AnimatePresence>
            {isSubmeted === "true" && (
              <motion.div
                key="modal"
                className="h-[41.5px] aspect-square rounded flex justify-center items-center
          bg-[#34D399]
          "
                initial={{ display: "none", opacity: 0, scale: 0.1 }}
                animate={{ display: "flex", opacity: 1, scale: 1 }}
                exit={{ display: "none", opacity: 0, scale: 0.1 }}
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
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: isSubmeted === "true" ? 1 : 0,
                      opacity: isSubmeted === "true" ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </motion.div>
            )}

            <motion.input
              className="border rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-200 p-2 text-base border-[#cbcfd6] outline-none"
              placeholder="My Password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </AnimatePresence>
        </div>
        <button
          className={`w-full text-base hover:bg-[#4e92ff] bg-[#3B82F6] mt-4 transition-colors text-white p-2 font-semibold text-center rounded duration-300 
          `}
          onClick={submit}
        >
          Signup
        </button>
        <div className="text-sm font-medium mt-1">
          Already have an account? <span className="text-[#3B82F6]">Login</span>
        </div>
        <div className="border-t border-[#E5E7EB] w-full h-[1px] my-4"></div>
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
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
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
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
