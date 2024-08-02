import { faCheck, faClose, faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import { Color, Store } from "../../../../types/store.types";
import api from "../../../../utils/api";
import { displayNotification } from "../../../../utils/helper";
import { ColorTable } from "../../components/ColorTable";

export const CreateColors: FC<{
  store: Store;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  refetch: (search?: string, label?: string) => void;
}> = ({ store, setEdit, refetch }) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [formData, setFormData] = useState({
    color_id: "",
    store_id: String(store.id),
    price: 0,
  });
  const [errors, setErrors] = useState({
    color_id: "",
    price: "",
  });

  useEffect(() => {
    api
      .get("/colors", { params: { item_per_page: 100 } })
      .then((res) => {
        const fetchData = res.data.data;
        setColors(fetchData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const validate = () => {
    let isValid = true;
    const newErrors = { color_id: "", price: "" };

    if (formData.color_id === "") {
      newErrors.color_id = "Color is required";
      isValid = false;
    } else {
      newErrors.color_id = "";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price is required";
      isValid = false;
    } else {
      newErrors.price = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    if (validate()) {
      api
        .post("/store/colors", formData)
        .then(() => {
          displayNotification("Color successfully added", "success");
          setEdit(false);
          refetch();
        })
        .catch((err) => {
          const errorsMsg = err.response.data.message;
          if (errorsMsg.color) {
            setErrors({
              ...errors,
              color_id: errorsMsg.color,
            });
          } else {
            displayNotification("Failed to add color", "error");
          }
        });
    }
  };

  const handleFormChange = (
    label: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [label]: e.target.value });
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Choose available colors</h1>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            className="hover:cursor-pointer hover:text-success"
            onClick={handleCreate}
            icon={faCheck}
            title="Confirm"
            size="lg"
          />
          <FontAwesomeIcon
            className="hover:cursor-pointer hover:text-error"
            onClick={() => setEdit(false)}
            icon={faClose}
            title="Cancel"
            size="lg"
          />
        </div>
      </div>
      <div className="flex gap-4 my-2">
        <label className="flex flex-col" htmlFor="color">
          <span className="mb-2">Color</span>
          <select
            onChange={(e) => handleFormChange("color_id", e)}
            className="w-fit p-2.5 rounded-md border-r-[12px] border-transparent px-4 outline outline-1 bg-white shadow outline-gray-300"
            name="color"
            id="color"
          >
            <option value="">Choose a color</option>
            {colors.length &&
              colors.map((color) => {
                return (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                );
              })}
          </select>
          {errors.color_id && (
            <span className="text-error text-sm ml-2 mt-1">
              {errors.color_id}
            </span>
          )}
        </label>
        <label className="flex flex-col" htmlFor="price">
          <span className="mb-2">Price</span>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FontAwesomeIcon
                className="absolute top-0 left-2 text-gray-400 translate-y-[70%]"
                icon={faDollar}
              />
            </div>
            <input
              type="number"
              min={0.1}
              id="price"
              className="border shadow border-gray-300 text-gray-900 rounded-md ps-6 p-2 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
              placeholder="Ex: 10"
              onChange={(e) => handleFormChange("price", e)}
            />
          </div>
          {errors.price && (
            <span className="text-error text-sm ml-2 mt-1">{errors.price}</span>
          )}
        </label>
      </div>

      <ColorTable storeId={store.id} colors={store.colors} refetch={refetch} />
    </div>
  );
};
