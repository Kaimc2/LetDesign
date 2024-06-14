import logo from "../../assets/images/brands/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGrip,
  faRightFromBracket,
  faShirt,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "./Drawer";

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
          <p>{user?.name}</p>
          <img
            className="w-16 h-16 rounded-full"
            src="/placeholder/pf.png"
            alt="profile picture"
          />

          {/* Dropdown Menu */}
          {toggleDropdown && (
            <div
              className="flex flex-col absolute right-0 top-[72px] w-[206px] border border-gray-200 bg-white 
              rounded-md shadow-md z-20"
            >
              <Link
                className="flex items-center gap-4 p-4 hover:bg-accent hover:text-white"
                to={"/dashboard"}
              >
                <FontAwesomeIcon icon={faGrip} size="lg"></FontAwesomeIcon>
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-4 p-4 hover:bg-accent hover:text-white"
                to={"/design"}
              >
                <FontAwesomeIcon icon={faShirt}></FontAwesomeIcon>
                My Designs
              </Link>
              <Link
                className="flex items-center gap-4 p-4 hover:bg-accent hover:text-white"
                to="/dashboard/settings"
              >
                <FontAwesomeIcon icon={faUserPen} size="lg"></FontAwesomeIcon>
                Profile
              </Link>
              <button
                onClick={logout}
                className="border flex items-center gap-4 border-t-brand-gray p-4 hover:bg-accent hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="lg"
                ></FontAwesomeIcon>
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/register"}
          className="hidden md:block px-[20px] py-[10px] text-2xl bg-secondary hover:bg-secondary-80 text-white rounded-md "
        >
          Sign Up
        </Link>
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
