import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode, useState } from "react";

interface Props {
  name: string;
  icon: IconProp;
  children: ReactNode;
}

export const NavbarDropdown: FC<Props> = ({ name, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex relative items-center justify-between px-4 py-3 rounded-md hover:bg-accent-80
               hover:text-white hover:cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={icon} size="lg" />
          <p>{name}</p>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={
            isOpen
              ? "rotate-180 transition-transform ml-6 md:ml-0"
              : "rotate-0 transition-transform ml-6 md:ml-0"
          }
        />
      </div>
      {isOpen && (
        <div
          className="flex absolute ml-[8.5rem] mt-14 z-20 p-2 bg-white border border-gray-300 shadow rounded-md flex-col 
          gap-2 md:static md:p-0 md:mt-0 md:ml-6 md:shadow-none md:bg-none md:border-none md:rounded-none"
        >
          {children}
        </div>
      )}
    </>
  );
};
