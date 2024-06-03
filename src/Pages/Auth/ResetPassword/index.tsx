import React, { ChangeEvent, useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase/firebase-config";
import { Input } from "../../../Components/Input";
import { object } from "../../../utils/ValidateErrors";
import { useNavigate } from "react-router-dom";

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
            navigate("/dashboard");
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 w-[400px] overflow-hidden border-2 rounded-md border-[#E5E7EB] shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)]">
        <div className="text-[#3B82F6] text-[42px] font-extralight text-center p-4 transition-colors duration-300">
          Reset Password
        </div>
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
          <button
            className="signup-submit-button"
            type="submit"
            disabled={buttonIsDisabled}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="signup-loading"
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
              <div>{message !== "" ? message : "Send Email"}</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
