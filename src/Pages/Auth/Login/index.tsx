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
import { Button, Loading } from "../../../Components";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { facebockSignup } from "../../../utils/FacebookSignin";
import { googleSignIn } from "../../../utils/GoogleSignin";

export const Login = () => {
  const [loginData, setLoginData] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState<"true" | "wrong" | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
            setIsChecked("wrong");
            setTimeout(() => {
              setIsChecked("");
            }, 1800);
          });
      }
    },
    [loginData.email, loginData.password, navigate, validate]
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

        <div className="login-links-container">
          <a
            href="/signup"
            className={`login-links  ${
              isChecked === "wrong"
                ? "text-[#EF4444]"
                : "hover:text-[#4e92ff] text-[#3B82F6]"
            } `}
          >
            Register
          </a>
          <a
            href="/password-reset"
            className={`login-links  ${
              isChecked === "wrong"
                ? "text-[#EF4444]"
                : "hover:text-[#4e92ff] text-[#3B82F6]"
            } `}
          >
            Forgot Password ?
          </a>
        </div>
        <motion.button
          onClick={loginAction}
          className={`login-btn
          ${
            isChecked === "wrong"
              ? "bg-[#EF4444]"
              : "bg-[#3B82F6] hover:bg-[#4e92ff]"
          } 
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
          {isLoading ? <Loading /> : "Check"}
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
          <div className="login-divider"></div>
          <Button
            styles="login-facebook-btn"
            icon={faFacebookF}
            onClick={facebockSignup}
            label="Sign in with Facebook"
            labelStyles="font-medium text-sm"
          />
          <Button
            styles="login-google-btn"
            icon={faGoogle}
            onClick={() => googleSignIn(navigate)}
            label="Sign in with Google"
            labelStyles="font-medium text-sm"
          />
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
      <div className="absolute right-24">
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
