// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const useRoleGuard = (requiredRole: string) => {
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       // Redirect to login if not authenticated
//       navigate("/login");
//     } else if (user?.role !== requiredRole) {
//       // Redirect to an unauthorized page if the role doesn't match
//       navigate("/unauthorized");
//     }
//   }, [isAuthenticated, user, requiredRole, navigate]);
// };

// export default useRoleGuard;
