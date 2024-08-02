import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
