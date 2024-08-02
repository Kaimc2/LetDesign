import { createBrowserRouter } from "react-router-dom";
import { Page403 } from "../core/error/Page403";
import { Page404 } from "../core/error/Page404";
import { DashboardLayout } from "../core/layout/DashboardLayout";
import { EditorLayout } from "../core/layout/EditorLayout";
import HomeLayout from "../core/layout/HomeLayout";
import { About } from "../pages/About";
import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { VerificationMessage } from "../pages/auth/VerificationMessage";
import { Commission } from "../pages/dashboard/commission/Commission";
import { Preview } from "../pages/dashboard/commission/Preview";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { DeletedDesign } from "../pages/dashboard/designs/DeletedDesign";
import { DesignPage } from "../pages/dashboard/designs/Design";
import { Options } from "../pages/dashboard/options/Options";
import { Settings } from "../pages/dashboard/settings/Settings";
import { MyStore } from "../pages/dashboard/store/MyStore";
import { Stores } from "../pages/dashboard/Stores";
import { Users } from "../pages/dashboard/Users";
import { CreateCommission } from "../pages/commission/CreateCommission";
import { Editor } from "../pages/editor/Editor";
import { UpdateEditor } from "../pages/editor/UpdateEditor";
import { Home } from "../pages/Home";
import { Adjustment } from "../pages/dashboard/Adjustment";

export const router = createBrowserRouter([
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
  { path: "/design", element: <Editor /> },
  {
    path: "/design",
    element: <EditorLayout />,
    children: [
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
      { path: "adjustment", element: <Adjustment /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "/dashboard/commissions/:id", element: <Preview /> },
]);
