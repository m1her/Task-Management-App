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
        //   type={!hide ? type : "text"}
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
            className="absolute top-0 left-0 w-full text-[#EF4444] bg-[#f29c9c] h-[42px] rounded flex items-center gap-x-2 pl-2"
            key="inputError"
            initial={{ y: 41 }}
            animate={{ y: 0 }}
            exit={{ y: 41 }}
            transition={{ ease: "linear" }}
          >
            <FontAwesomeIcon
              className="w-4 h-4 text-white bg-[#EF4444] rounded-full"
              icon={faCircleXmark}
            />
            <span className="text-sm font-medium mb-0.5">{errorMsg}</span>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};
