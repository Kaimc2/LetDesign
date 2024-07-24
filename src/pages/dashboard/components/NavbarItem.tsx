import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  link: string;
  icon: IconProp;
  isEnd?: boolean;
}

export const NavbarItem: FC<Props> = ({ name, link, icon, isEnd = false }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "w-fit md:w-full bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
          : "w-fit md:w-full flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
      }
      end={isEnd}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
      <p>{name}</p>
    </NavLink>
  );
};
