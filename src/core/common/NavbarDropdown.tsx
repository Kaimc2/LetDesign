import {
  faGrip,
  faShirt,
  faUserPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Divider } from "./Divider";
import { FC, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

export const NavbarDropdown: FC<{
  setToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setToggleDropdown }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggleDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col absolute right-0 top-[72px] w-[206px] border border-gray-200 bg-white 
              rounded-md shadow-md z-20"
    >
      <Link
        className="flex items-center rounded-tl-md rounded-tr-md gap-4 p-4 hover:bg-accent hover:text-white"
        to={"/dashboard"}
      >
        <FontAwesomeIcon icon={faGrip} size="lg"></FontAwesomeIcon>
        Dashboard
      </Link>
      <Link
        className="flex items-center gap-4 p-4 hover:bg-accent hover:text-white"
        to={"/dashboard/designs"}
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
      <Divider />
      <button
        onClick={logout}
        className="flex items-center rounded-bl-md rounded-br-md gap-4 p-4 hover:bg-accent hover:text-white"
      >
        <FontAwesomeIcon icon={faRightFromBracket} size="lg"></FontAwesomeIcon>
        Sign Out
      </button>
    </div>
  );
};
