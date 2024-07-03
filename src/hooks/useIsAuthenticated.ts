import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useIsAuthenticated = (redirectUrl?: string) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user?.isVerified) {
        navigate(redirectUrl || "/", { replace: true });
      } else {
        navigate("/account/verify", {
          state: { email: user?.email, id: user?.id },
        });
      }

      setLoading(false);
    };

    checkAuth();
  }, [
    isAuthenticated,
    navigate,
    redirectUrl,
    user?.email,
    user?.id,
    user?.isVerified,
  ]);

  return loading;
};

export default useIsAuthenticated;
