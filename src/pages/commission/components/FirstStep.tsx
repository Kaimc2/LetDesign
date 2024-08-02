import { faPerson, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { TailorDialog } from "./TailorDialog";
import { Store } from "../../../types/store.types";

export const FirstStep: FC<{
  store: Store | null;
  selectedStore: React.Dispatch<React.SetStateAction<Store | null>>;
  commissionType: string;
  setCommissionType: React.Dispatch<
    React.SetStateAction<"individual" | "team">
  >;
}> = ({ store, selectedStore, commissionType, setCommissionType }) => {
  const [tailorDialog, setTailorDialog] = useState(false);

  const selectTailor = (newStore: Store) => {
    selectedStore(newStore);
    setTailorDialog(false);
  };

  return (
    <>
      {store ? (
        <div
          onClick={() => setTailorDialog(true)}
          className="flex gap-4 px-3 py-4 items-center border border-gray-400 rounded-md select-none hover:cursor-pointer
                 hover:border-black"
        >
          <img
            className="w-[60px] h-[60px] rounded-md"
            src={
              store.tailorThumbnail
                ? String(store.tailorThumbnail)
                : "/placeholder/placeholder.jpg"
            }
            alt="tailor"
          />
          <h1>{store.name}</h1>
        </div>
      ) : (
        <button
          onClick={() => setTailorDialog(true)}
          className="border border-gray-500 text-gray-500 py-2 rounded-md hover:border-black hover:text-black"
        >
          Pick a Tailor
        </button>
      )}

      {tailorDialog && (
        <TailorDialog
          blurFn={() => setTailorDialog(false)}
          confirmFn={selectTailor}
          cancelFn={() => setTailorDialog(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        <h1>Select your commission type</h1>

        <div
          onClick={() => setCommissionType("individual")}
          className={`flex gap-4 px-3 py-4 items-center border rounded-md select-none hover:cursor-pointer
                 hover:border-black ${
                   commissionType === "individual"
                     ? "border-black"
                     : "border-gray-400"
                 }`}
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
          onClick={() => setCommissionType("team")}
          className={`flex gap-4 px-3 py-4 items-center border rounded-md select-none hover:cursor-pointer
                 hover:border-black ${
                   commissionType === "team"
                     ? "border-black"
                     : "border-gray-400"
                 }`}
        >
          <FontAwesomeIcon icon={faPeopleGroup} size="xl" />
          <div>
            <h1 className="mb-0.5">Team/Group Batch</h1>
            <p className="text-xs text-gray-500">
              Ideals for creating matching designs for a group or team.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
