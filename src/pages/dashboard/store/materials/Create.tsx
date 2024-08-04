import { faCheck, faClose, faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import { Material, Store } from "../../../../types/store.types";
import api from "../../../../utils/api";
import { displayNotification } from "../../../../utils/helper";
import { MaterialTable } from "../../components/MaterialTable";

export const CreateMaterials: FC<{
  store: Store;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  refetch: (search?: string, label?: string) => void;
}> = ({ store, setEdit, refetch }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [formData, setFormData] = useState({
    material_id: "",
    store_id: String(store.id),
    price: 0,
  });
  const [errors, setErrors] = useState({
    material_id: "",
    price: "",
  });

  useEffect(() => {
    api
      .get("/materials", { params: { item_per_page: 100 } })
      .then((res) => {
        const fetchData = res.data.data.data;
        setMaterials(fetchData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const validate = () => {
    let isValid = true;
    const newErrors = { material_id: "", price: "" };

    if (formData.material_id === "") {
      newErrors.material_id = "Material is required";
      isValid = false;
    } else {
      newErrors.material_id = "";
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
        .post("/store/materials", formData)
        .then(() => {
          displayNotification("Material successfully added", "success");
          setEdit(false);
          refetch();
        })
        .catch((err) => {
          const errorsMsg = err.response.data.message;
          if (errorsMsg.material) {
            setErrors({
              ...errors,
              material_id: errorsMsg.material,
            });
          } else {
            displayNotification("Failed to add material", "error");
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
        <h1 className="text-xl font-semibold">
          Choose available cloth materials
        </h1>
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
        <label className="flex flex-col" htmlFor="material">
          <span className="mb-2">Material</span>
          <select
            onChange={(e) => handleFormChange("material_id", e)}
            className="w-fit p-2.5 rounded-md border-r-[12px] border-transparent px-4 outline outline-1 bg-white shadow outline-gray-300"
            name="material"
            id="material"
          >
            <option value="">Choose a material</option>
            {materials.length &&
              materials.map((material) => {
                return (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                );
              })}
          </select>
          {errors.material_id && (
            <span className="text-error text-sm ml-2 mt-1">
              {errors.material_id}
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
              id="price"
              onChange={(e) => handleFormChange("price", e)}
              className="border shadow text-gray-900 rounded-md ps-6 p-2"
              placeholder="Ex: 10"
            />
          </div>
          {errors.price && (
            <span className="text-error text-sm ml-2 mt-1">{errors.price}</span>
          )}
        </label>
      </div>

      <MaterialTable
        storeId={store.id}
        materials={store.materials}
        refetch={refetch}
      />
    </div>
  );
};
