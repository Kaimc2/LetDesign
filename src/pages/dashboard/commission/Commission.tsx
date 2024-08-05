import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { CommissionType } from "../../../types/commission.types";
import api from "../../../utils/api";
import useFetchRole from "../../../hooks/useFetchRole";
import { CommissionTable } from "./componenets/CommissionTable";
import { LayoutLoader } from "../../../core/common/Loader";
import { PageMeta, DefaultPageMeta } from "../../../types/common.types";
import { Paginator } from "../../../core/common/Paginator";

export const Commission = () => {
  const [commissions, setCommisions] = useState<CommissionType[]>([]);
  const [search, setSearch] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<PageMeta>(DefaultPageMeta);
  const [pageNumber, setPageNumber] = useState(1);
  const { role } = useFetchRole();

  const fetchCommissions = useCallback(() => {
    const url =
      role === "tailor"
        ? "store/commissions"
        : role === "admin"
        ? "commissions"
        : "user/commissions";

    api
      .get(url, { params: { search: search, page: pageNumber } })
      .then((res) => {
        setPageInfo({
          currentPage: res.data.data.current_page,
          from: res.data.data.from,
          lastPage: res.data.data.last_page,
          perPage: res.data.data.per_page,
          to: res.data.data.to,
          total: res.data.data.total,
        });
        setCommisions(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pageNumber, role, search]);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions, refetch]);

  if (loading) return <LayoutLoader />;

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Commissions</h1>
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
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setRefetch(!refetch);
              }
            }}
            title="Press enter to search"
          />
        </div>

        <CommissionTable
          commissions={commissions}
          refetch={refetch}
          setRefetch={setRefetch}
        />

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
