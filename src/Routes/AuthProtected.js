import { Navigate } from "react-router-dom";
import { auth } from "../Firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthProtected = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/login" />;
};
