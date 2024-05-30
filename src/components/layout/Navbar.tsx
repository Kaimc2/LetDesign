import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-12 md:px-0 md:justify-evenly pt-[65px] pb-[115px]">
      <NavLink to={"/"}>
        <img className="w-[124px]" src={logo} alt="logo" />
      </NavLink>
      <ul className="hidden md:flex text-2xl gap-[80px]">
        <li className="hover:text-secondary">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "text-secondary-80" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text-secondary">
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? "text-secondary-80" : "")}
          >
            About
          </NavLink>
        </li>
        <li className="hover:text-secondary">
          <NavLink
            to={"/design"}
            className={({ isActive }) => (isActive ? "text-secondary-80" : "")}
          >
            Design
          </NavLink>
        </li>
      </ul>
      <button className="hidden md:block px-[20px] py-[10px] text-2xl bg-secondary hover:bg-secondary-80 text-white rounded-md ">
        Sign Up
      </button>
      <button onClick={() => console.log("Hello")} className="flex md:hidden">
        <FontAwesomeIcon
          icon={faBars}
          size="2xl"
          style={{ color: "#000000" }}
        />
      </button>
    </nav>
  );
};
