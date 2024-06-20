import {
  faGrip,
  faShirt,
  faUserPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Divider } from "./Divider";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const NavbarDropdown = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div
      tabIndex={0}
      onBlur={() => console.log("not me")}
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
