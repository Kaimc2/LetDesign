import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useMemo, useEffect, ChangeEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LayoutLoader } from "../../core/common/Loader";
import api from "../../utils/api";
import { displayNotification } from "../../utils/helper";
import { Store } from "../../types/store.types";

export const Stores = () => {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStores = useMemo(
    () => async () => {
      api
        .get("/stores", {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
          params: { search: search },
        })
        .then((res) => {
          const fetchData = res.data.data;
          setStores(fetchData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to load stores", "error");
          setLoading(false);
        });
    },
    [search, user?.accessToken]
  );

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  if (loading) return <LayoutLoader />;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Stores</h1>
      </div>

      <div className="p-8 w-full md:max-w-[calc(100vw-330px)] max-h-[calc(100vh-120px)] overflow-y-auto flex flex-col flex-wrap gap-4">
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

        <table className="shadow-md table-auto border border-gray-200 rounded-md">
          <thead className="text-left">
            <tr className="border border-b-brand-gray">
              <th className="py-5 pl-8">Name</th>
              <th className="py-5">Description</th>
              <th className="py-5">Email</th>
              <th className="py-5">Phone Number</th>
              <th className="py-5">Owner</th>
              <th className="py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {stores.length ? (
              stores.map((store) => {
                return (
                  <tr key={store.id} className="border border-b-brand-gray">
                    <td className="flex items-center gap-4 py-4 pl-8">
                      <img
                        className="w-10 h-10 rounded-md"
                        src={
                          store.tailorThumbnail
                            ? String(store.tailorThumbnail)
                            : "/placeholder/placeholder.jpg"
                        }
                        alt="tailor_thumbnail"
                      />
                      <p>{store.name}</p>
                    </td>
                    <td className="py-4">{store.description}</td>
                    <td className="py-4">{store.email}</td>
                    <td className="py-4">{store.phoneNumber}</td>
                    <td className="py-4">{store.ownerName}</td>
                    <td className="hover:cursor-pointer">
                      <FontAwesomeIcon icon={faEllipsis} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4">No Stores</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
