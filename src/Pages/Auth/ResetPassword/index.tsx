import React, { ChangeEvent, useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase/firebase-config";
import { Input } from "../../../Components/Input";
import { object } from "../../../utils/ValidateErrors";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from "../../../Components";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [resettingData, setResettingData] = useState<{ [k: string]: string }>({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setResettingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      sendPasswordResetEmail(auth, resettingData.email)
        .then(() => {
          setMessage("Email Sent Successfully!");
          setIsLoading(false);
          setTimeout(() => {
            setMessage("");
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          setErrors(error);
          setIsLoading(false);
          setTimeout(() => {
            setErrors({ email: "" });
          }, 2000);
        });
    }
  };

  const validate = useCallback(() => {
    const userSchema = object({
      email: ["string", "required", "email"],
    });
    const result = userSchema.validate(resettingData);
    setErrors(result.errors);
    setButtonIsDisabled(true);
    setTimeout(() => {
      setErrors({ email: "" });
      setButtonIsDisabled(false);
    }, 2000);
    return result.valid;
  }, [resettingData]);

  return (
    <div className="rp-page-container">
      <div className="rp-card">
        <div className="rp-title">Reset Password</div>
        <form onSubmit={handleResetPassword}>
          <Input
            id="email-reset"
            name="email"
            type="text"
            placeholder="My Email"
            onChange={handleChange}
            value={resettingData.email}
            error={errors?.email}
            errorMsg={errors?.email}
          />
          <Button
            styles="rp-button"
            type="submit"
            disabled={buttonIsDisabled}
            isLoading={isLoading}
            label={message !== "" ? message : "Send Email"}
          />
        </form>
      </div>
    </div>
  );
};
