import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useAuthRedirect = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the previous page or home page if authenticated
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [isAuthenticated, navigate, location.state?.from]);
};

export default useAuthRedirect;
