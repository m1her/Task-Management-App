import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
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
import { object } from "../../../utils/ValidateErrors";
import { Input } from "../../../Components/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase-config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: any }>({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
      password: ["string", "required", "min=6"],
    });
    const result = userSchema.validate(loginData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
      });
    }, 2000);
    return result.valid;
  }, [loginData]);

  const loginAction = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (validate()) {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(() => {
            setIsLoading(false);
            setIsChecked("true");
            setTimeout(() => {
              navigate("/dashboard");
            }, 2400);
          })
          .catch((err) => {
            setErrors({ email: "Wrong email or password", password: "" });
            setIsLoading(false);
          });
      }
    },
    [loginData.email, loginData.password, validate]
  );

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
        <div className="flex flex-col gap-y-4 mt-4">
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="My Email"
            onChange={handleChange}
            value={loginData?.email}
            error={errors?.email}
            errorMsg={errors?.email}
          />
          <Input
            id="signup-password"
            name="password"
            type="password"
            placeholder="My Password"
            value={loginData?.password}
            onChange={handleChange}
            error={errors?.password}
            errorMsg={errors?.password}
          />
        </div>

        <div className="w-full flex justify-between z-30 absolute pr-8">
          <a
            href="/signup"
            className=" hover:underline hover:text-[#4e92ff] text-[#3B82F6] text-sm font-medium mt-1"
          >
            Register
          </a>
          <a
            href="/"
            className="hover:underline hover:text-[#4e92ff] text-[#3B82F6] text-sm font-medium mt-1"
          >
            Forgot Password ?
          </a>
        </div>
        <motion.button
          onClick={loginAction}
          className={`w-full text-base my transition-colors text-white p-2 font-semibold text-center rounded
          ${
            isChecked === "wrong"
              ? "bg-[#EF4444]"
              : "bg-[#3B82F6] hover:bg-[#4e92ff]"
          } transition-colors duration-300 
          `}
          initial={{ display: "none", opacity: 0 }}
          animate={{
            display: loginData.email && loginData.password ? "inline" : "none",
            opacity: loginData.email && loginData.password ? 1 : 0,
            y: loginData.email && loginData.password ? 62 : 0,
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
          {isLoading ? (
            <div
              role="status"
              className="w-full flex justify-center items-center"
            >
              <svg
                aria-hidden="true"
                className="w-[24px] h-[24px] text-[#ffffff52] animate-spin fill-white"
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
            "Check"
          )}
        </motion.button>
        <motion.div
          className="absolute w-full pr-8 bottom-4"
          initial={{ y: 0 }}
          animate={{
            y: loginData.email && loginData.password ? 150 : 0,
            opacity: loginData.email && loginData.password ? 0 : 1,
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
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
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
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
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
