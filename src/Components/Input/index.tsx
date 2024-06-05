import React, { ChangeEvent } from "react";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface TextInputTypes {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string;
  error?: boolean | string;
  errorMsg?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  maxLength?: number;
  inputStyle?: string;
}

export const Input = ({
  id,
  name = "textInput",
  type = "text",
  value = "",
  placeholder = "Enter value",
  inputStyle = "",
  error,
  errorMsg,
  onChange = () => {},
  autoFocus,
  disabled = false,
  defaultValue,
  maxLength,
}: TextInputTypes) => {
  return (
    <div className="w-full relative overflow-hidden">
      <input
        autoFocus={autoFocus}
        autoComplete="off"
        id={id}
        name={name}
        type={type}
        value={value}
        className={`input-tag ${inputStyle}`}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        maxLength={maxLength}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            className="input-error"
            key="inputError"
            initial={{ y: 41 }}
            animate={{ y: 0 }}
            exit={{ y: 41 }}
            transition={{ ease: "linear" }}
          >
            <FontAwesomeIcon
              className="input-error-icon"
              icon={faCircleXmark}
            />
            <span className="input-error-text">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
