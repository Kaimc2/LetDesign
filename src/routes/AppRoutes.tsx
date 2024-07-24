import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../core/layout/HomeLayout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Editor } from "../pages/editor/Editor";
import { EditorLayout } from "../core/layout/EditorLayout";
import { DashboardLayout } from "../core/layout/DashboardLayout";
import { VerificationMessage } from "../pages/auth/VerificationMessage";
import { Settings } from "../pages/dashboard/settings/Settings";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { DesignPage } from "../pages/dashboard/designs/Design";
import { DeletedDesign } from "../pages/dashboard/designs/DeletedDesign";
import { Commission } from "../pages/dashboard/commission/Commission";
import { CreateCommission } from "../pages/editor/CreateCommission";
import { Page404 } from "../core/error/Page404";
import { Page403 } from "../core/error/Page403";
import { UpdateEditor } from "../pages/editor/UpdateEditor";
import { Users } from "../pages/dashboard/Users";
import { Stores } from "../pages/dashboard/Stores";
import { MyStore } from "../pages/dashboard/store/MyStore";
import { Options } from "../pages/dashboard/options/Options";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account/verify", element: <VerificationMessage /> },
      { path: "unauthorized", element: <Page403 /> },
      { path: "*", element: <Page404 /> },
    ],
  },
  {
    path: "/design",
    element: <EditorLayout />,
    children: [
      { path: "", element: <Editor /> },
      { path: "edit/:id", element: <UpdateEditor /> },
      {
        path: "commission/create",
        element: <CreateCommission />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "designs", element: <DesignPage /> },
      { path: "designs/removed", element: <DeletedDesign /> },
      { path: "my-store", element: <MyStore /> },
      { path: "stores", element: <Stores /> },
      { path: "users", element: <Users /> },
      { path: "options", element: <Options /> },
      { path: "commissions", element: <Commission /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
