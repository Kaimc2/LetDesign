import { FC, useState } from "react";
import { Size } from "../../../types/store.types";
import {
  faCheck,
  faClose,
  faDollar,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfirmDialog } from "../../../core/common/ConfirmDialog";
import api from "../../../utils/api";
import { displayNotification } from "../../../utils/helper";

export const SizeTable: FC<{
  storeId: string;
  sizes: Size[];
  refetch: (search?: string, label?: string) => void;
}> = ({ storeId, sizes, refetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({ price: "" });
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [search, setSearch] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
  const [dialogState, setDialogState] = useState(false);

  const handleUpdate = () => {
    if (!updatePrice) {
      setErrors({ price: "Price is required" });
      return;
    }

    const formData = {
      store_id: String(storeId),
      size_id: String(selectedSize?.sizeID),
      price: updatePrice,
    };

    api
      .put(`store/sizes/${selectedSize?.id}`, formData)
      .then(() => {
        displayNotification("Size updated successfully", "success");
        setIsEdit(false);
        setSelectedSize(null);
        refetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Failed to add size", "error");
      });
  };

  const handleDelete = () => {
    api
      .delete(`store/sizes/${selectedSize?.id}`)
      .then((res) => {
        displayNotification(res.data.message, "success");
        setIsEdit(false);
        setSelectedSize(null);
        refetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Failed to delete size", "error");
      });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              refetch(search, "size");
            }
          }}
          id="size-search"
          title="Press enter to search"
        />
      </div>

      <table className="shadow-md table-fixed border border-gray-200 rounded-md  w-full">
        <thead className="text-left">
          <tr className="border border-b-brand-gray">
            <th className="py-4 pl-8">Size</th>
            <th className="py-4">Price</th>
            <th className="py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {sizes.length ? (
            sizes.map((size) => {
              return (
                <tr key={size.id} className="border border-b-brand-gray">
                  {isEdit && selectedSize?.id === size.id ? (
                    <>
                      <td className="w-1/2 py-2 pl-6">{size.name}</td>
                      <td className="py-2">
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
                            onChange={(e) =>
                              setUpdatePrice(Number(e.target.value))
                            }
                            className="border shadow text-gray-900 rounded-md ps-6 p-2"
                            placeholder="Ex: 10"
                            value={updatePrice}
                          />
                        </div>
                        {errors.price && (
                          <span className="text-error text-sm ml-2 mt-1">
                            {errors.price}
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
                            setSelectedSize(null);
                            setErrors({ price: "" });
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
                      <td className="w-1/2 py-4 pl-8">{size.name}</td>
                      <td className="py-4">{`$${size.price}`}</td>
                      <td className="flex py-4 gap-8">
                        <FontAwesomeIcon
                          className=" hover:cursor-pointer hover:text-success"
                          onClick={() => {
                            setIsEdit(true);
                            setSelectedSize(size);
                            setUpdatePrice(size.price ?? 0);
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
                            setSelectedSize(size);
                            setUpdatePrice(size.price ?? 0);
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
              <td className="p-4">No Sizes</td>
            </tr>
          )}
        </tbody>
      </table>

      {dialogState && (
        <ConfirmDialog
          name={selectedSize?.name ?? "Size Name"}
          blurFn={() => setDialogState(false)}
          confirmFn={handleDelete}
          cancelFn={() => setDialogState(false)}
          isDeleted
        />
      )}
    </div>
  );
};
