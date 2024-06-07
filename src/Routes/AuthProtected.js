import { Navigate } from "react-router-dom";
import { auth } from "../Firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthProtected = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};
