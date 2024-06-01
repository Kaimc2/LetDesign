import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../components/layout/HomeLayout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Editor } from "../pages/Editor";
import { EditorLayout } from "../components/layout/EditorLayout";
import { DashboardLayout } from "../components/layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/design",
    element: <EditorLayout />,
    children: [{ path: "", element: <Editor /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
