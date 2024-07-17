import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Color } from "../../../types/store.types";
import {
  faSearch,
  faCheck,
  faClose,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/AuthContext";
import { SectionLoader } from "../../../core/common/Loader";
import api from "../../../utils/api";
import { displayNotification } from "../../../utils/helper";
import { ConfirmDialog } from "../../../core/common/ConfirmDialog";

export const Colors = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [colors, setColors] = useState<Color[]>([]);
  const [formData, setFormData] = useState<{ name: string; hexCode: string }>({
    name: "",
    hexCode: "#000000",
  });
  const [updateFormData, setUpdateFormData] = useState<{
    name: string;
    hexCode: string;
  }>({
    name: "",
    hexCode: "#000000",
  });
  const [errors, setErrors] = useState({ name: "", updateName: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [dialogState, setDialogState] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchColors = useCallback(() => {
    api
      .get("/colors", { params: { search: search } })
      .then((res) => {
        const fetchData = res.data.data;
        setColors(fetchData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors, refetch, search]);

  const triggerRefetch = () => {
    setRefetch((prev) => prev + 1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFormDataChange = (
    field: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdateFormDataChange = (
    field: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateFormData({ ...updateFormData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }

    api
      .post(
        "/colors",
        { name: formData.name, hex_code: formData.hexCode },
        { headers: { Authorization: `Bearer  ${user?.accessToken}` } }
      )
      .then(() => {
        displayNotification("Color added successfully", "success");
        setFormData({ name: "", hexCode: "#000000" });
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleUpdate = () => {
    if (!updateFormData.name) {
      setErrors({ ...errors, updateName: "Name is required" });
      return;
    }

    api
      .put(
        `/colors/${selectedColor?.id}`,
        { name: updateFormData.name, hex_code: updateFormData.hexCode },
        { headers: { Authorization: `Bearer  ${user?.accessToken}` } }
      )
      .then(() => {
        displayNotification("Color added successfully", "success");
        setIsEdit(false);
        setFormData({ name: "", hexCode: "#000000" });
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleDelete = () => {
    api
      .delete(`/colors/${selectedColor?.id}`, {
        headers: { Authorization: `Bearer  ${user?.accessToken}` },
      })
      .then((res) => {
        displayNotification(res.data.message, "success");
        setIsEdit(false);
        setSelectedColor(null);
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  return (
    <div className="flex flex-col gap-4">
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
            onChange={handleSearchChange}
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
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleFormDataChange("name", e)}
            />
            {errors.name && (
              <span className="text-error text-sm ml-2 mt-1">
                {errors.name}
              </span>
            )}
          </div>
          <input
            className="border border-gray-300 rounded-md"
            type="color"
            value={formData.hexCode}
            onChange={(e) => handleFormDataChange("hexCode", e)}
            title="Pick a color"
          />
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
              <th className="py-5 pl-8">Hex Code</th>
              <th className="py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {colors.length ? (
              colors.map((color) => {
                return (
                  <tr key={color.id} className="border border-b-brand-gray">
                    {isEdit && selectedColor?.id === color.id ? (
                      <>
                        <td className="w-1/3 py-2 pl-6">
                          <input
                            className={`px-2 py-2 border rounded-md ${
                              errors.updateName
                                ? "border-error"
                                : "border-gray-400"
                            }`}
                            type="text"
                            value={updateFormData.name}
                            onChange={(e) =>
                              handleUpdateFormDataChange("name", e)
                            }
                            placeholder="Name"
                          />
                          {errors.updateName && (
                            <span className="text-error text-sm ml-2 mt-1">
                              {errors.updateName}
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          <input
                            className={`border rounded-md`}
                            type="color"
                            value={updateFormData.hexCode}
                            onChange={(e) =>
                              handleUpdateFormDataChange("hexCode", e)
                            }
                            placeholder="Hex Code"
                          />
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
                              setSelectedColor(null);
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
                        <td className="w-1/3 py-4 pl-8">{color.name}</td>
                        <td className="flex items-center gap-2 py-4">
                          <div
                            style={{ backgroundColor: color.hexCode }}
                            className={`w-8 h-8 rounded-md`}
                          ></div>
                          <span>{color.hexCode}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-6">
                            <FontAwesomeIcon
                              className=" hover:cursor-pointer hover:text-success"
                              onClick={() => {
                                setIsEdit(true);
                                setSelectedColor(color);
                                setUpdateFormData(color);
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
                                setSelectedColor(color);
                              }}
                              title="Delete"
                              size="lg"
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4">No Colors</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {dialogState && (
        <ConfirmDialog
          name={selectedColor?.name ?? "Color Name"}
          blurFn={() => setDialogState(false)}
          confirmFn={handleDelete}
          cancelFn={() => setDialogState(false)}
          isDeleted
        />
      )}
    </div>
  );
};
