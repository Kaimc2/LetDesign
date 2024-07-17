import {
  faCheck,
  faClose,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useState } from "react";
import api from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { displayNotification } from "../../../utils/helper";
import { SectionLoader } from "../../../core/common/Loader";
import { Material } from "../../../types/store.types";
import { ConfirmDialog } from "../../../core/common/ConfirmDialog";

export const Materials = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialName, setMaterialName] = useState("");
  const [updateMaterialName, setUpdateMaterialName] = useState("");
  const [errors, setErrors] = useState({ name: "", updateName: "" });
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [dialogState, setDialogState] = useState(false);

  const fetchMaterials = useCallback(() => {
    api
      .get("/materials", { params: { search: search } })
      .then((res) => {
        const fetchData = res.data.data.data;
        setMaterials(fetchData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials, refetch, search]);

  const triggerRefetch = () => {
    setRefetch((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (!materialName) {
      setErrors({ ...errors, name: "Material is required" });
      return;
    }

    api
      .post(
        "/materials",
        { name: materialName },
        { headers: { Authorization: `Bearer  ${user?.accessToken}` } }
      )
      .then(() => {
        displayNotification("Material added successfully", "success");
        setMaterialName("");
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleUpdate = () => {
    if (!updateMaterialName) {
      setErrors({ ...errors, updateName: "Material is required" });
      return;
    }

    api
      .put(
        `/materials/${selectedMaterial?.id}`,
        { name: updateMaterialName },
        { headers: { Authorization: `Bearer  ${user?.accessToken}` } }
      )
      .then(() => {
        displayNotification("Material updated successfully", "success");
        setIsEdit(false);
        setSelectedMaterial(null);
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleDelete = () => {
    api
      .delete(`/materials/${selectedMaterial?.id}`, {
        headers: { Authorization: `Bearer  ${user?.accessToken}` },
      })
      .then((res) => {
        displayNotification(res.data.message, "success");
        setIsEdit(false);
        setSelectedMaterial(null);
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="relative">
          <FontAwesomeIcon
            className="absolute text-gray-400 left-4 translate-y-[calc(50%+4px)]"
            icon={faSearch}
          />
          <input
            className="px-2 pl-10 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Search"
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id="search"
          />
        </div>

        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <input
              className={`px-4 py-2 rounded-md border ${
                errors.name ? "border-error" : "border-gray-400"
              }`}
              type="text"
              placeholder="Material"
              value={materialName}
              onChange={(e) => {
                e.preventDefault();
                setMaterialName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (materialName && e.key === "Enter") handleSubmit();
              }}
            />
            {errors.name && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.name}
              </span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100"
          >
            Add
          </button>
        </div>
      </div>

      {loading ? (
        <SectionLoader />
      ) : (
        <table className="shadow-md table-fixed border border-gray-200 rounded-md">
          <thead className="text-left">
            <tr className="border border-b-brand-gray">
              <th className="py-5 pl-8">Name</th>
              <th className="py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {materials.length ? (
              materials.map((material) => {
                return (
                  <tr key={material.id} className="border border-b-brand-gray">
                    {isEdit && selectedMaterial?.id === material.id ? (
                      <>
                        <td className="w-1/2 py-2 pl-6">
                          <input
                            className={`px-2 py-2 border rounded-md w-fit ${
                              errors.updateName
                                ? "border-error"
                                : "border-gray-400"
                            }`}
                            type="text"
                            value={updateMaterialName}
                            onChange={(e) => {
                              setUpdateMaterialName(e.target.value);
                            }}
                            placeholder="Material"
                          />
                          {errors.updateName && (
                            <span className="text-error text-sm ml-2 mt-1">
                              {errors.updateName}
                            </span>
                          )}
                        </td>
                        <td className="flex py-4 gap-8">
                          <FontAwesomeIcon
                            className=" hover:cursor-pointer hover:text-success"
                            onClick={handleUpdate}
                            icon={faCheck}
                            title="Confirm"
                            size="lg"
                          />
                          <FontAwesomeIcon
                            onClick={() => {
                              setIsEdit(false);
                              setSelectedMaterial(null);
                            }}
                            className=" hover:cursor-pointer hover:text-error"
                            icon={faClose}
                            title="Cancel"
                            size="lg"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="w-1/2 py-4 pl-8">{material.name}</td>
                        <td className="flex py-4 gap-8">
                          <FontAwesomeIcon
                            className=" hover:cursor-pointer hover:text-success"
                            onClick={() => {
                              setIsEdit(true);
                              setSelectedMaterial(material);
                              setUpdateMaterialName(material.name);
                            }}
                            icon={faEdit}
                            title="Edit"
                            size="lg"
                          />
                          <FontAwesomeIcon
                            className=" hover:cursor-pointer hover:text-error"
                            icon={faTrash}
                            onClick={() => {
                              setDialogState(true);
                              setSelectedMaterial(material);
                            }}
                            title="Delete"
                            size="lg"
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4">No Materials</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {dialogState && (
        <ConfirmDialog
          name={selectedMaterial?.name ?? "Material Name"}
          blurFn={() => setDialogState(false)}
          confirmFn={handleDelete}
          cancelFn={() => setDialogState(false)}
          isDeleted
        />
      )}
    </div>
  );
};
