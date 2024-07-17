import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { Store } from "../../types/store.types";
import { LayoutLoader } from "../../core/common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const MyStore = () => {
  const { user } = useContext(AuthContext);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStore = useMemo(
    () => async () => {
      api
        .get(`/stores/${user?.id}`, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        })
        .then((res) => {
          const fetchData = res.data.data;
          if (fetchData) {
            setStore({ ...fetchData });
            setLoading(false);
          } else {
            setStore(null);
            setLoading(false);
          }
        })
        .catch((err) => console.error(`Network Error: ${err}`));
    },
    [user?.accessToken, user?.id]
  );

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  if (loading) return <LayoutLoader />;

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">My Store</h1>
      </div>

      <div className="p-8 w-full md:max-w-[calc(100vw-330px)] max-h-[calc(100vh-120px)] overflow-y-auto flex flex-col flex-wrap gap-4">
        <div className="overflow-y-auto border rounded-md shadow shadow-zinc-300 border-gray-300">
          {store ? (
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    className="w-20 h-20 rounded-md"
                    src="/placeholder/placeholder.jpg"
                    alt="store_thumbnail"
                  />
                  <p>{store.name}</p>
                </div>
                <button className="px-4 py-2 border border-gray-400 hover:bg-gray-100 rounded-md">
                  Edit
                </button>
              </div>

              <div className="my-4">
                <h1 className="text-xl font-semibold">Description</h1>
                <p>{store.description}</p>
              </div>

              <div className="my-4 flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Contact Information</h1>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />
                  <p>{store.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                  <p>{store.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  <p>{store.email}</p>
                </div>
              </div>

              <div className="my-4">
                <h1 className="text-xl font-semibold">
                  Choose available fabrics
                </h1>
                {store.materials.length ? (
                  store.materials.map((material) => {
                    return <p>{material.name}</p>;
                  })
                ) : (
                  <div>No Materials</div>
                )}
              </div>

              <div className="my-4">
                <h1 className="text-xl font-semibold">
                  Choose available colors
                </h1>
                {store.colors.length ? (
                  store.colors.map((color) => {
                    return <p>{color.name}</p>;
                  })
                ) : (
                  <div>No Colors</div>
                )}
              </div>

              <div className="my-4">
                <h1 className="text-xl font-semibold">
                  Choose available sizes
                </h1>
                {store.sizes.length ? (
                  store.sizes.map((size) => {
                    return <p>{size.name}</p>;
                  })
                ) : (
                  <div>No Sizes</div>
                )}
              </div>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center p-6 border border-gray-400 border-dashed rounded-md">
              <span>Create a store</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
