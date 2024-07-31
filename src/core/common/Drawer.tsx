import {
  faClose,
  faGrip,
  faShirt,
  faUserPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Divider } from "./Divider";
import User from "../../types/user.types";

interface Props {
  user: User | null;
  isOpen: boolean;
  isAuthenticated: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export const Drawer: FC<Props> = ({
  user,
  isOpen,
  isAuthenticated,
  setIsOpen,
  logout,
}) => {
  return (
    <div
      id="drawer"
      className={`flex flex-col md:hidden ${
        isOpen ? "w-[60%]" : "w-0"
      } h-full top-0 right-0 absolute transition-all border border-gray-200 bg-white 
              rounded-md shadow-md z-20 ease-in-out duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <FontAwesomeIcon
          className="hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          icon={faClose}
          size="2xl"
        />

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <p>{user?.name}</p>
            <img
              className="w-16 h-16 rounded-full"
              src={user?.profilePicture ?? "/placeholder/pf.png"}
              alt="profile picture"
            />
          </div>
        )}
      </div>

      <Divider />

      {!isAuthenticated ? (
        <Link
          to={"/register"}
          className="px-[20px] mx-4 py-[10px] text-center text-2xl bg-secondary hover:bg-secondary-80 text-white rounded-md"
        >
          Sign Up
        </Link>
      ) : (
        <>
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
          <Divider />
          <button
            onClick={logout}
            className="flex items-center gap-4 p-4 hover:bg-accent hover:text-white"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="lg"
            ></FontAwesomeIcon>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};
