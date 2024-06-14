import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../components/layout/HomeLayout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Editor } from "../pages/editor/Editor";
import { EditorLayout } from "../components/layout/EditorLayout";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { VerificationMessage } from "../pages/auth/VerificationMessage";
import { Settings } from "../pages/dashboard/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/account-verify", element: <VerificationMessage /> },
    ],
  },
  {
    path: "/design",
    element: <EditorLayout />,
    children: [{ path: "", element: <Editor /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "settings", element: <Settings /> }],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
