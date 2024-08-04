import { faClose, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Divider } from "../../../core/common/Divider";
import User from "../../../types/user.types";

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
        isOpen ? "w-[60%]" : "w-0 hidden"
      } h-full top-0 right-0 absolute transition-all border border-gray-200 bg-white 
              rounded-md shadow-md z-20 ease-in-out duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <FontAwesomeIcon
          className="hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          icon={faClose}
          size="xl"
        />

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <p>{user?.name}</p>
            <img
              className="w-14 h-1w-14 rounded-full"
              src={user?.profilePicture ?? "/placeholder/pf.png"}
              alt="profile picture"
            />
          </div>
        )}
      </div>

      <Divider />

      <>
        <Link
          className="flex items-center gap-4 p-4 hover:bg-accent-80 hover:text-white"
          to={"/"}
        >
          Home
        </Link>
        <Link
          className="flex items-center gap-4 p-4 hover:bg-accent-80 hover:text-white"
          to={"/about"}
        >
          About
        </Link>
        <Link
          className="flex items-center gap-4 p-4 hover:bg-accent-80 hover:text-white"
          to="/design"
        >
          Design
        </Link>
        <Divider />
        <button
          onClick={logout}
          className="flex items-center gap-4 p-4 hover:bg-accent-80 hover:text-white"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="lg"
          ></FontAwesomeIcon>
          Sign Out
        </button>
      </>
    </div>
  );
};
