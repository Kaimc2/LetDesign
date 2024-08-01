import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../common/Loader";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export const EditorLayout = () => {
  const { loading } = useContext(AuthContext);
  useAuthRedirect();

  if (loading) return <Loader />;

  return (
    <section>
      <Outlet />
    </section>
  );
};
