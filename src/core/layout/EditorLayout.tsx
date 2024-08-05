import { Outlet } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export const EditorLayout = () => {
  useAuthRedirect();

  return (
    <section>
      <Outlet />
    </section>
  );
};
