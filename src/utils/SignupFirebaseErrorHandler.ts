interface types {
  err?: any;
  setErrors: (value: React.SetStateAction<{ [k: string]: any }>) => void;
}
export const SignupFirebaseErrorHandler = ({ err, setErrors }: types) => {
  let errorMessage = "An error occurred";
  if (err.code) {
    switch (err.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "The email address is already in use by another account.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is not valid.";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Operation not allowed. Please contact support.";
        break;
      case "auth/weak-password":
        errorMessage = "The password is too weak.";
        break;
      default:
        errorMessage = "An unknown error occurred. Please try again.";
        break;
    }
  }
  setErrors({ email: errorMessage, password: "" });
};
