import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

function HomeLayout() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div className="absolute top-0 w-screen h-screen bg-background -z-10"></div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
