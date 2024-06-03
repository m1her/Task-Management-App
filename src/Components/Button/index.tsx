import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { Loading } from "../Loading";

interface ButtonTypes {
  id?: string;
  name?: string;
  form?: string;
  type?: "button" | "submit" | "reset";
  label?: string;
  disabled?: boolean;
  icon?: IconDefinition | null;
  styles?: string;
  labelStyles?: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  id,
  name,
  form,
  type = "button",
  label = "",
  disabled = false,
  icon,
  styles = "bg-primary-color text-white",
  labelStyles = "",
  onClick = () => {},
  isLoading = false,
}: ButtonTypes) => {
  return (
    <button
      id={id}
      name={name}
      form={form}
      type={type}
      className={`button w-full ${styles} `}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {icon && <FontAwesomeIcon icon={icon} />}
          <span className={labelStyles}> {label}</span>
        </>
      )}
    </button>
  );
};
