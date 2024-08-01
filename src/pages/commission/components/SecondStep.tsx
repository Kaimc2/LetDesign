import { forwardRef, useImperativeHandle, useState } from "react";
import { Store } from "../../../types/store.types";
import { Select } from "../../../core/common/Select";
import { Step2Ref } from "../CreateCommission";

interface Step2Props {
  store: Store | null;
  commissionType: "individual" | "team" | "bulk";
  errors: { material?: string; color?: string; sizes?: string };
  setErrors: React.Dispatch<
    React.SetStateAction<{ material?: string; color?: string; sizes?: string }>
  >;
}

export const SecondStep = forwardRef<Step2Ref, Step2Props>((props, ref) => {
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [sizes, setSizes] = useState<{ size: string; qty: number }[]>([]);
  const { errors, setErrors } = props;

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      material,
      color,
      sizes,
    }),
    validateForm: () => validateForm(),
  }));

  const handleSizeChange = (currentSize: string, newQty: number) => {
    const existingSizeIndex = sizes.findIndex(
      (item) => item.size === currentSize
    );

    if (existingSizeIndex >= 0) {
      // Update the quantity of the existing size
      const newSizes = sizes.map((item, index) =>
        index === existingSizeIndex ? { ...item, qty: newQty } : item
      );
      setSizes(newSizes);
    } else {
      // Add a new size
      setSizes([...sizes, { size: currentSize, qty: newQty }]);
    }
  };

  const validateForm = () => {
    const newErrors: { material?: string; color?: string; sizes?: string } = {};
    if (!material) newErrors.material = "Material is required";
    if (!color) newErrors.color = "Color is required";
    if (sizes.length === 0) newErrors.sizes = "At least one size is required";
    let noSizes = true;
    sizes.map((size) => {
      if (size.qty !== 0) noSizes = false;
    });
    if (noSizes) newErrors.sizes = "At least one size is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Material Section */}
        <h1>Select your cloth material</h1>
        {props.store?.materials ? (
          <label className="flex flex-col" htmlFor="material">
            <select
              onChange={(e) => setMaterial(e.target.value)}
              className="w-auto p-2.5 rounded-md border-r-[12px] border-transparent px-4 outline outline-1 bg-white shadow outline-gray-300"
              name="material"
              id="material"
            >
              <option value="">Choose a material</option>
              {props.store.materials.length &&
                props.store?.materials.map((material, index) => {
                  return (
                    <option key={index} value={material.name}>
                      {material.name}
                    </option>
                  );
                })}
            </select>
            {errors?.material && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.material}
              </span>
            )}
          </label>
        ) : (
          <div className="text-sm">No materials</div>
        )}
      </div>

      {/* Size Section */}
      <div className="flex flex-col gap-4">
        <h1>Select your size</h1>

        {props.commissionType === "individual" ? (
          props.store?.sizes ? (
            <label className="flex flex-col" htmlFor="size">
              <select
                onChange={(e) => {
                  e.target.value !== ""
                    ? setSizes([{ size: e.target.value, qty: 1 }])
                    : setSizes([]);
                }}
                className="w-auto p-2.5 rounded-md border-r-[12px] border-transparent px-4 outline outline-1 bg-white shadow outline-gray-300"
                name="size"
                id="size"
              >
                <option value="">Choose a size</option>
                {props.store.sizes.length &&
                  props.store?.sizes.map((size) => {
                    return (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    );
                  })}
              </select>
              {errors?.sizes && (
                <span className="text-error text-sm ml-2 mt-1">
                  {errors.sizes}
                </span>
              )}
            </label>
          ) : (
            <div className="text-sm">No Sizes</div>
          )
        ) : (
          <div className="flex flex-col gap-2">
            {props.store?.sizes ? (
              props.store.sizes.length &&
              props.store?.sizes.map((size) => {
                return (
                  <label
                    key={size.id}
                    className="flex items-center gap-2"
                    htmlFor={size.name}
                  >
                    <span className="flex-1">{size.name}</span>
                    <input
                      onChange={(e) =>
                        handleSizeChange(size.name, parseInt(e.target.value))
                      }
                      type="number"
                      id={size.name}
                      className="border shadow text-gray-900 rounded-md ps-4 p-2"
                      placeholder="Quantity"
                    />
                  </label>
                );
              })
            ) : (
              <div className="text-sm">No sizes</div>
            )}
            {errors?.sizes && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.sizes}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Color Section */}
      <div className="flex flex-col gap-4">
        <h1>Color</h1>

        <div>
          {props.store?.colors ? (
            <Select label={color !== "" ? color : "Pick a color"}>
              <div
                onClick={() => setColor("")}
                className="border p-2.5 px-4 hover:cursor-pointer bg-white hover:bg-accent hover:text-white"
              >
                Pick a color
              </div>
              {props.store.colors.length &&
                props.store.colors.map((color) => {
                  return (
                    <div
                      key={color.id}
                      onClick={() => setColor(color.name)}
                      className="border flex items-center gap-1 p-2.5 px-4 hover:cursor-pointer bg-white hover:bg-accent hover:text-white"
                    >
                      <div
                        style={{ backgroundColor: color.hexCode }}
                        className={`w-5 h-5 rounded`}
                      ></div>
                      {color.name}
                    </div>
                  );
                })}
            </Select>
          ) : (
            <div className="text-sm">No colors</div>
          )}
          {errors?.color && (
            <span className="text-error text-sm ml-2 mt-1">{errors.color}</span>
          )}
        </div>
      </div>
    </>
  );
});
