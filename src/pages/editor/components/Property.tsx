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
      className={`w-[314px] px-8 py-4 border border-l-gray-300 shadow-md ${
        showProperty
          ? "translate-x-0 visible transition ease-in-out duration-300 motion-reduce:transition-none"
          : "translate-x-full invisible ease-in-out duration-300 motion-reduce:transition-none"
      }`}
    >
      <h1>Property</h1>
      {!selectedObj ? (
        <p>Select an object</p>
      ) : (
        <>
          <p>
            X:
            <input
              type="number"
              name="x"
              value={selectedObj?.x}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          <p>
            Y:
            <input
              type="number"
              name="y"
              value={selectedObj?.y}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          {!("radius" in selectedObj) && (
            <>
              <p>
                Width:
                <input
                  type="number"
                  name="width"
                  value={selectedObj?.width}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </p>

              <p>
                Height:
                <input
                  type="number"
                  name="height"
                  value={selectedObj?.height}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputBlur();
                  }}
                />
              </p>
            </>
          )}
          {"radius" in selectedObj && (
            <p>
              Radius:
              <input
                type="number"
                name="radius"
                value={selectedObj.radius ?? ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </p>
          )}
          <p>
            Rotation:
            <input
              type="number"
              name="angle"
              value={selectedObj?.angle}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          {"cornerRadius" in selectedObj && (
            <p>
              Corner Radius:
              <input
                type="number"
                name="cornerRadius"
                value={selectedObj.cornerRadius ?? ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </p>
          )}
          {"fontFamily" in selectedObj && (
            <p>
              Font Family:
              <select
                name="fontFamily"
                value={selectedObj.fontFamily ?? ""}
                onChange={handleSelectChange}
              >
                <option value="Times New Roman">Times New Roman</option>
                <option value="Monospace">Monospace</option>
              </select>
            </p>
          )}
          {"fontSize" in selectedObj && (
            <p>
              Font Size:
              <input
                type="number"
                name="fontSize"
                value={selectedObj.fontSize ?? ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur();
                }}
              />
            </p>
          )}
          {"fontWeight" in selectedObj && (
            <p>
              Font Weight:
              <select
                name="fontWeight"
                value={selectedObj.fontWeight ?? ""}
                onChange={handleSelectChange}
              >
                <option value="normal">Regular</option>
                <option value="bold">Bold</option>
              </select>
            </p>
          )}
          {"fontStyle" in selectedObj && (
            <p>
              Text Style:
              <select
                name="fontStyle"
                value={selectedObj.fontStyle ?? ""}
                onChange={handleSelectChange}
              >
                <option value="normal">Regular</option>
                <option value="italic">Italic</option>
              </select>
            </p>
          )}
          {"textAlign" in selectedObj && (
            <p>
              Text Align:
              <select
                name="textAlign"
                value={selectedObj.textAlign ?? ""}
                onChange={handleSelectChange}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </p>
          )}
        </>
      )}
    </div>
  );
};
