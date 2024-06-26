import { FC } from "react";

export const ConfirmDialog: FC<{
  name: string;
  blurFn: () => void;
  confirmFn: () => void;
  cancelFn: () => void;
}> = ({ name, blurFn, confirmFn, cancelFn }) => {
  return (
    <div
      onClick={blurFn}
      className="w-screen h-screen p-4 absolute flex items-center justify-center top-0 left-0 bg-brand-gray/20"
    >
      <div className="w-auto sm:w-[500px] h-auto sm:h-[163px] flex flex-col justify-center p-4 gap-2 bg-white rounded-md">
        <p className="text-2xl mb-3">
          Are you sure you want to move to {name} trash?
        </p>
        <div className="flex gap-2">
          <button
            onClick={confirmFn}
            className="px-[40px] py-[10px] text-2xl rounded-md bg-error hover:bg-error-dark text-white"
          >
            Yes
          </button>
          <button
            onClick={cancelFn}
            className="px-[40px] py-[10px] text-2xl rounded-md bg-black hover:bg-black/80 text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};