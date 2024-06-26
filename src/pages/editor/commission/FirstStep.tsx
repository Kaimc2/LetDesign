import {
  faPerson,
  faPeopleGroup,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TailorDialog } from "./TailorDialog";

export const FirstStep = () => {
  const [tailorDialog, setTailorDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setTailorDialog(true)}
        className="border border-gray-500 text-gray-500 py-2 rounded-md hover:border-black hover:text-black"
      >
        Pick a Tailor
      </button>

      {tailorDialog && (
        <TailorDialog
          blurFn={() => setTailorDialog(false)}
          confirmFn={() => setTailorDialog(false)}
          cancelFn={() => setTailorDialog(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1>Select your commission type</h1>

        <div
          className="flex gap-4 px-3 py-4 items-center border border-gray-400 rounded-md select-none hover:cursor-pointer
                 hover:border-black"
        >
          <FontAwesomeIcon className="ml-1" icon={faPerson} size="2xl" />
          <div>
            <h1 className="mb-0.5">Individual Design</h1>
            <p className="text-xs text-gray-500">
              Perfect for one-off or personal use.
            </p>
          </div>
        </div>

        <div
          className="flex gap-3 px-3 py-4 items-center border border-gray-400 rounded-md select-none hover:cursor-pointer 
                hover:border-black"
        >
          <FontAwesomeIcon icon={faPeopleGroup} size="xl" />
          <div>
            <h1 className="mb-0.5">Team/Group Batch</h1>
            <p className="text-xs text-gray-500">
              Ideals for creating matching designs for a group or team.
            </p>
          </div>
        </div>

        <div
          className="flex gap-3 px-3 py-4 items-center border border-gray-400 rounded-md select-none hover:cursor-pointer 
                hover:border-black"
        >
          <FontAwesomeIcon icon={faBoxesStacked} size="xl" />
          <div>
            <h1 className="mb-0.5">Bulk Order</h1>
            <p className="text-xs text-gray-500">
              Great for ordering large quantities, suitable for resale or
              events.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
