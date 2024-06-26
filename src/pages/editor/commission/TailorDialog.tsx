import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

export const TailorDialog: FC<{
  blurFn: () => void;
  confirmFn: () => void;
  cancelFn: () => void;
}> = ({ blurFn, confirmFn, cancelFn }) => {
  return (
    <div
      onClick={blurFn}
      className="w-screen z-10 h-screen p-4 absolute flex items-center justify-center top-0 left-0 bg-brand-gray/20"
    >
      <div className="w-auto sm:w-[512px] h-auto sm:h-[600px] overflow-y-auto flex flex-col gap-2 bg-white rounded-md">
        <div className="flex items-center border border-b-gray-400 py-6 justify-center relative">
          <p className="text-2xl">Pick your Tailor</p>
          <FontAwesomeIcon
            onClick={cancelFn}
            className="absolute right-6 hover:cursor-pointer"
            icon={faClose}
            size="2xl"
          />
        </div>

        <div className="flex flex-col mt-4 px-6">
          <h1 className="text-center mb-6">
            Choose from our selection of tailors for your fit
          </h1>

          <div
            onClick={confirmFn}
            className="flex items-center border border-gray-400 rounded-md p-4 gap-4 mb-4 select-none hover:cursor-pointer shadow-md hover:shadow-none"
          >
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="/placeholder/placeholder.jpg"
              alt="tailor"
            />
            <div>
              <h1>Tailor Name</h1>
              <p className="text-gray-500">Detail information for the tailor</p>
            </div>
          </div>
          <div
            onClick={confirmFn}
            className="flex items-center border border-gray-400 rounded-md p-4 gap-4 mb-4 select-none hover:cursor-pointer shadow-md hover:shadow-none"
          >
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="/placeholder/placeholder.jpg"
              alt="tailor"
            />
            <div>
              <h1>Tailor Name 2</h1>
              <p className="text-gray-500">Detail information for the tailor</p>
            </div>
          </div>
          <div
            onClick={confirmFn}
            className="flex items-center border border-gray-400 rounded-md p-4 gap-4 mb-4 select-none hover:cursor-pointer shadow-md hover:shadow-none"
          >
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="/placeholder/placeholder.jpg"
              alt="tailor"
            />
            <div>
              <h1>Tailor Name 3</h1>
              <p className="text-gray-500">Detail information for the tailor</p>
            </div>
          </div>
          <div
            onClick={confirmFn}
            className="flex items-center border border-gray-400 rounded-md p-4 gap-4 mb-4 select-none hover:cursor-pointer shadow-md hover:shadow-none"
          >
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="/placeholder/placeholder.jpg"
              alt="tailor"
            />
            <div>
              <h1>Tailor Name 4</h1>
              <p className="text-gray-500">Detail information for the tailor</p>
            </div>
          </div>
          <div
            onClick={confirmFn}
            className="flex items-center border border-gray-400 rounded-md p-4 gap-4 mb-4 select-none hover:cursor-pointer shadow-md hover:shadow-none"
          >
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="/placeholder/placeholder.jpg"
              alt="tailor"
            />
            <div>
              <h1>Tailor Name 5</h1>
              <p className="text-gray-500">Detail information for the tailor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
