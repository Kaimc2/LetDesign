import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/brands/logo_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHome,
  faPenRuler,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export const DashboardLayout = () => {
  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="flex items-center h-16 px-8 bg-secondary">
        <Link to={"/"}>
          <img className="w-12 h-12 rounded-md" src={logo} alt="Logo" />
        </Link>

        <ul className="flex w-full justify-center gap-[80px]">
          <li className="hover:text-accent-80">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-accent-80">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="hover:text-accent-80">
            <Link to={"/design"}>Design</Link>
          </li>
        </ul>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex flex-col justify-between w-[314px] px-8 py-[26px] border border-r-gray-300 shadow-md">
          <ul className="flex flex-col gap-[26px]">
            <li className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer">
              <FontAwesomeIcon icon={faHome} size="lg" />
              <p>Overview</p>
            </li>
            <li className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer">
              <FontAwesomeIcon icon={faPenRuler} size="lg" />
              <p>My Design</p>
            </li>
            <li className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer">
              <FontAwesomeIcon icon={faHome} size="lg" />
              <p>Commission</p>
            </li>
            <li className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer">
              <FontAwesomeIcon icon={faGear} size="lg" />
              <p>Settings</p>
            </li>
          </ul>

          <div className="flex flex-col gap-6">
            <Link
              to={"/profile"}
              className="flex p-2 gap-2 items-center hover:shadow-md border hover:border-gray-300 hover:cursor-pointer rounded-md"
            >
              <img className="w-10 h-10 rounded-full" src="" alt="Profile" />
              <div>
                <p>PPC</p>
                <p>p1ch3ypr4k@gmail.com</p>
              </div>
            </Link>
            <div className="bg-gray-400 h-1 rounded-md"></div>
            <button className="flex w-full items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer">
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
              <p>Logout</p>
            </button>
          </div>
        </div>

        <div className="flex-grow h-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
