import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useAuthRedirect = (redirectUrl?: string) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the previous page or home page if authenticated
      navigate(redirectUrl || "/", { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);
};

export default useAuthRedirect;
