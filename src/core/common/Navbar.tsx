import logo from "../../assets/images/brands/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "./Drawer";
import { NavbarDropdown } from "./NavbarDropdown";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <nav className="flex items-center justify-between px-12 md:px-0 md:justify-evenly pt-[65px]">
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

      {isAuthenticated ? (
        <div
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className="hidden md:flex relative items-center gap-4 hover:cursor-pointer"
        >
          <img
            className="w-16 h-16 rounded-full"
            src="/placeholder/pf.png"
            alt="profile picture"
          />

          {/* Dropdown Menu */}
          {toggleDropdown && <NavbarDropdown />}
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link to={"/login"} className="hidden md:block text-2xl hover:text-secondary-80">Sign In</Link>
          <Link
            to={"/register"}
            className="hidden md:block px-[20px] py-[10px] text-2xl bg-secondary hover:bg-secondary-80 text-white rounded-md "
          >
            Sign Up
          </Link>
        </div>
      )}

      <button
        onClick={() => setToggleDrawer(!toggleDrawer)}
        className="flex md:hidden"
      >
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </button>

      {/* Drawer */}
      <Drawer
        user={user}
        isOpen={toggleDrawer}
        isAuthenticated={isAuthenticated}
        setIsOpen={setToggleDrawer}
        logout={logout}
      />
    </nav>
  );
};
