import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

function HomeLayout() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div className="absolute top-0 w-screen h-screen bg-[#f5f5f5] -z-10"></div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
