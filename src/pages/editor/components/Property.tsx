import { FC } from "react";
import { SelectedObjectProperty } from "../../../types/editor.types";

interface Props {
  selectedObj: SelectedObjectProperty | null;
  showProperty: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    acceptString?: boolean
  ) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputBlur: () => void;
}

export const Property: FC<Props> = ({
  selectedObj,
  showProperty,
  handleInputChange,
  handleSelectChange,
  handleInputBlur,
}) => {
  return (
    <div
      className={`w-[314px] border border-l-gray-300 shadow-md ${
        showProperty
          ? "translate-x-0 visible transition ease-in-out duration-300 motion-reduce:transition-none"
          : "translate-x-full invisible ease-in-out duration-300 motion-reduce:transition-none"
      }`}
    >
      <h1 className="py-4 px-8 font-bold border border-b-brand-gray">
        Property
      </h1>
      {!selectedObj ? (
        <p className="px-8 py-4">Select an object</p>
      ) : (
        <div className="flex flex-col gap-4  px-8 py-4">
          <div className="flex w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1">
              <p className="ml-1">X:</p>
              <input
                type="number"
                name="x"
                className="p-2 border border-gray-400 rounded-md"
                value={selectedObj?.x}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <p className="ml-1">Y:</p>
              <input
                type="number"
                name="y"
                className="p-2 border border-gray-400 rounded-md"
                value={selectedObj?.y}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </div>
          </div>
          {!("radius" in selectedObj) && (
            <div className="flex w-full gap-2">
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Width:</p>
                <input
                  type="number"
                  name="width"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj?.width}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Height:</p>
                <input
                  type="number"
                  name="height"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj?.height}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </div>
            </div>
          )}
          {"radius" in selectedObj && (
            <div className="flex flex-col w-1/2 gap-1">
              <p className="ml-1">Radius:</p>
              <input
                type="number"
                name="radius"
                className="p-2 border border-gray-400 rounded-md"
                value={selectedObj.radius ?? ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </div>
          )}
          <div className="flex w-full gap-2">
            {!("radius" in selectedObj) && (
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Rotation:</p>
                <input
                  type="number"
                  name="angle"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj?.angle}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </div>
            )}
            {"cornerRadius" in selectedObj && (
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Corner Radius:</p>
                <input
                  type="number"
                  name="cornerRadius"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj.cornerRadius ?? ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </div>
            )}
          </div>
          <input
            type="color"
            name="fill"
            id="fill"
            onChange={(e) => handleInputChange(e, true)}
            value={String(selectedObj.fill) ?? "#000000"}
          />
          {"fontFamily" in selectedObj && (
            <div className="flex flex-col w-full gap-1">
              <p className="ml-1">Font Family:</p>
              <select
                name="fontFamily"
                className="p-2 border border-gray-400 rounded-md"
                value={selectedObj.fontFamily ?? ""}
                onChange={handleSelectChange}
              >
                <option value="Times New Roman">Times New Roman</option>
                <option value="Monospace">Monospace</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>
          )}
          <div className="flex w-full gap-2">
            {"fontSize" in selectedObj && (
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Font Size:</p>
                <input
                  type="number"
                  name="fontSize"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj.fontSize ?? ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </div>
            )}
            {"fontWeight" in selectedObj && (
              <div className="flex flex-col w-1/2 gap-1">
                <p className="ml-1">Font Weight:</p>
                <select
                  name="fontWeight"
                  className="p-2 border border-gray-400 rounded-md"
                  value={selectedObj.fontWeight ?? ""}
                  onChange={handleSelectChange}
                >
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            )}
          </div>
          {"fontStyle" in selectedObj && (
            <div className="flex flex-col w-1/2 gap-1">
              <p className="ml-1">Text Style:</p>
              <select
                name="fontStyle"
                className="p-2 border border-gray-400 rounded-md"
                value={selectedObj.fontStyle ?? ""}
                onChange={handleSelectChange}
              >
                <option value="normal">Regular</option>
                <option value="italic">Italic</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
