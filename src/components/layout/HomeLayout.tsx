import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function HomeLayout() {
  return (
    <div className="h-screen bg-[#f5f5f5]">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
