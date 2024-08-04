import {
  faSearch,
  faCheck,
  faClose,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { SectionLoader } from "../../../core/common/Loader";
import { Size } from "../../../types/store.types";
import api from "../../../utils/api";
import { displayNotification } from "../../../utils/helper";
import { ConfirmDialog } from "../../../core/common/ConfirmDialog";
import { PageMeta, DefaultPageMeta } from "../../../types/common.types";
import { Paginator } from "../../../core/common/Paginator";

export const Sizes = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [sizes, setSizes] = useState<Size[]>([]);
  const [sizeName, setSizeName] = useState("");
  const [updateSizeName, setUpdateSizeName] = useState("");
  const [errors, setErrors] = useState({ name: "", updateName: "" });
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dialogState, setDialogState] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageMeta>(DefaultPageMeta);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchSizes = useCallback(() => {
    api
      .get("/sizes", { params: { search: search, page: pageNumber } })
      .then((res) => {
        const fetchData = res.data.data.data;
        setPageInfo({
          currentPage: res.data.data.current_page,
          from: res.data.data.from,
          lastPage: res.data.data.last_page,
          perPage: res.data.data.per_page,
          to: res.data.data.to,
          total: res.data.data.total,
        });
        setSizes(fetchData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pageNumber, search]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes, refetch, search]);

  const triggerRefetch = () => {
    setRefetch((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (!sizeName) {
      setErrors({ ...errors, name: "Size is required" });
      return;
    }

    api
      .post(
        "/sizes",
        { name: sizeName },
        { headers: { Authorization: `Bearer  ${user?.accessToken}` } }
      )
      .then(() => {
        displayNotification("Size added successfully", "success");
        setSizeName("");
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleUpdate = () => {
    if (!updateSizeName) {
      setErrors({ ...errors, updateName: "Size is required" });
      return;
    }

    api
      .put(`/sizes/${selectedSize?.id}`, { name: updateSizeName })
      .then(() => {
        displayNotification("Size updated successfully", "success");
        setIsEdit(false);
        setSelectedSize(null);
        triggerRefetch();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Network Error", "error");
      });
  };

  const handleDelete = () => {
    api
      .delete(`/sizes/${selectedSize?.id}`, {
        headers: { Authorization: `Bearer  ${user?.accessToken}` },
      })
      .then((res) => {
        displayNotification(res.data.message, "success");
        setIsEdit(false);
        setSelectedSize(null);
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
              placeholder="Size"
              value={sizeName}
              onChange={(e) => {
                setSizeName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (sizeName && e.key === "Enter") handleSubmit();
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
        <>
          <table className="shadow-md table-fixed border border-gray-200 rounded-md">
            <thead className="text-left">
              <tr className="border border-b-brand-gray">
                <th className="py-5 pl-8">Name</th>
                <th className="py-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {sizes.length ? (
                sizes.map((size) => {
                  return (
                    <tr key={size.id} className="border border-b-brand-gray">
                      {isEdit && selectedSize?.id === size.id ? (
                        <>
                          <td className="w-1/2 py-2 pl-6">
                            <input
                              className={`px-2 py-2 border rounded-md w-fit ${
                                errors.updateName
                                  ? "border-error"
                                  : "border-gray-400"
                              }`}
                              type="text"
                              value={updateSizeName}
                              onChange={(e) => {
                                setUpdateSizeName(e.target.value);
                              }}
                              placeholder="Size"
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
                                setSelectedSize(null);
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
                          <td className="flex py-4 gap-8">
                            <FontAwesomeIcon
                              className=" hover:cursor-pointer hover:text-success"
                              onClick={() => {
                                setIsEdit(true);
                                setSelectedSize(size);
                                setUpdateSizeName(size.name);
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

          <Paginator
            pageNumber={pageNumber}
            currentPage={pageInfo.currentPage}
            lastPage={pageInfo.lastPage}
            prevPage={() => {
              setPageNumber(pageInfo.currentPage - 1);
            }}
            nextPage={() => {
              setPageNumber(pageInfo.currentPage + 1);
            }}
          />
        </>
      )}

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
