import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode, useState } from "react";

export const Select: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col relative rounded-md border border-gray-300 shadow hover:cursor-pointer"
    >
      <div className="flex justify-between items-center select-none p-2.5 px-4">
        <span>{label}</span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`w-full absolute top-0 mt-[2.8rem] max-h-[184px] overflow-y-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
        {/* <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
          Hello
        </div>
        <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
          Hello
        </div>
        <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
          Hello
        </div>
        <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
          Hello
        </div>
        <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
          Hello
        </div> */}
      </div>
    </div>
  );
};

export const SelectItem: FC<{
  label: string;
}> = ({ label }) => {
  return (
    <div className="border p-2.5 px-4 hover:cursor-pointer hover:bg-accent hover:text-white">
      {label}
    </div>
  );
};
