import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../utils/api";
import { Store } from "../../../types/store.types";
import { LayoutLoader } from "../../../core/common/Loader";
import { StoreShow } from "./Show";
import { StoreUpdate } from "./Update";
import { StoreCreate } from "./Create";

export const MyStore = () => {
  const { user } = useContext(AuthContext);
  const [store, setStore] = useState<Store | null>(null);
  const [materialSearch, setMaterialSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(0);

  const fetchStore = useCallback(() => {
    api
      .get(`/stores/${user?.id}`, {
        params: {
          search_material: materialSearch,
          search_color: colorSearch,
          search_size: sizeSearch,
        },
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
      .then((res) => {
        const fetchData = res.data.data;
        if (fetchData) {
          setStore(fetchData);
          setLoading(false);
        } else {
          setStore(null);
          setLoading(false);
        }
      })
      .catch((err) => console.error(`Network Error: ${err}`));
  }, [colorSearch, materialSearch, sizeSearch, user?.accessToken, user?.id]);

  const triggerRefetch = (search?: string, label?: string) => {
    // Handle optional search for materials, colors, and sizes
    if (search && label) {
      switch (label) {
        case "material":
          setMaterialSearch(search);
          break;
        case "color":
          setColorSearch(search);
          break;
        case "size":
          setSizeSearch(search);
          break;
        default:
          break;
      }
    } else {
      setMaterialSearch("");
      setColorSearch("");
      setSizeSearch("");
    }

    setRefetch((prev) => prev + 1);
  };

  useEffect(() => {
    fetchStore();
  }, [fetchStore, refetch]);

  if (loading) return <LayoutLoader />;

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">My Store</h1>
      </div>

      <div className="overflow-y-auto p-8 w-full md:max-w-[calc(100vw-330px)] max-h-[calc(100vh-120px)] flex flex-col flex-wrap gap-4">
        <div className="border rounded-md shadow shadow-zinc-300 border-gray-300">
          {store ? (
            isEdit ? (
              <StoreUpdate
                store={store}
                setEdit={setIsEdit}
                refetch={triggerRefetch}
              />
            ) : (
              <StoreShow
                store={store}
                setEdit={setIsEdit}
                refetch={triggerRefetch}
              />
            )
          ) : isEdit ? (
            <StoreCreate setEdit={setIsEdit} refetch={triggerRefetch} />
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full flex items-center justify-center p-6 border border-gray-400 border-dashed rounded-md"
            >
              <span>Create a store</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
