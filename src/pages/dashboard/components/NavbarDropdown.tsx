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
        className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-accent-80
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
              ? "rotate-180 transition-transform"
              : "rotate-0 transition-transform"
          }
        />
      </div>
      {isOpen && <div className="flex flex-col gap-2 ml-6">{children}</div>}
    </>
  );
};
