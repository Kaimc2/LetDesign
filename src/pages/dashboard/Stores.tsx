import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { LayoutLoader } from "../../core/common/Loader";
import api from "../../utils/api";
import { displayNotification } from "../../utils/helper";
import { Store } from "../../types/store.types";
import { Paginator } from "../../core/common/Paginator";
import { PageMeta, DefaultPageMeta } from "../../types/common.types";
import useFetchRole from "../../hooks/useFetchRole";
import { useNavigate } from "react-router-dom";

export const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageInfo, setPageInfo] = useState<PageMeta>(DefaultPageMeta);
  const [pageNumber, setPageNumber] = useState(1);
  const { role, loadingRole } = useFetchRole();
  const navigate = useNavigate();

  const fetchStores = useMemo(
    () => async () => {
      api
        .get("/stores", {
          params: { search: search, page: pageNumber },
        })
        .then((res) => {
          const fetchData = res.data.data;
          setPageInfo(res.data.meta);
          setStores(fetchData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to load stores", "error");
          setLoading(false);
        });
    },
    [pageNumber, search]
  );

  useEffect(() => {
    if (!loadingRole) {
      if (role !== "admin") {
        navigate("/unauthorized");
      } else {
        fetchStores();
      }
    }
  }, [fetchStores, loadingRole, navigate, role]);

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
              <th className="py-5 pr-8">Owner</th>
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
                    <td className="py-4 pr-8">{store.ownerName}</td>
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
      </div>
    </div>
  );
};
