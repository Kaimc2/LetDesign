import { faSearch, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import User from "../../types/user.types";
import { LayoutLoader } from "../../core/common/Loader";
import { displayNotification } from "../../utils/helper";
import { Paginator } from "../../core/common/Paginator";
import { PageMeta, DefaultPageMeta } from "../../types/common.types";
import useFetchRole from "../../hooks/useFetchRole";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageInfo, setPageInfo] = useState<PageMeta>(DefaultPageMeta);
  const [pageNumber, setPageNumber] = useState(1);
  const { role, loadingRole } = useFetchRole();
  const navigate = useNavigate();

  const fetchUsers = useMemo(
    () => async () => {
      api
        .get("/users", {
          params: { search: search, page: pageNumber },
        })
        .then((res) => {
          const fetchData = res.data.data;
          setPageInfo(res.data.meta);
          setUsers(fetchData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to load users", "error");
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
        fetchUsers();
      }
    }
  }, [fetchUsers, loadingRole, navigate, role]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const assignNewRole = (id: string, role: string) => {
    api
      .post(`role/${id}`, { role: role })
      .then((res) => {
        displayNotification(res.data.message, "success");
      })
      .catch(() => {
        displayNotification("Failed to update role", "error");
      });
  };

  if (loading) return <LayoutLoader />;

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Users</h1>
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
              <th className="py-5">Email</th>
              <th className="py-5">Phone Number</th>
              <th className="py-5">Status</th>
              <th className="py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length ? (
              users.map((user) => {
                return (
                  <tr key={user.id} className="border border-b-brand-gray">
                    <td className="flex items-center gap-4 py-4 pl-8">
                      <img
                        className="w-10 h-10 rounded-md"
                        src={user.profilePicture ?? "/placeholder/pf.png"}
                        alt="profile_picture"
                      />
                      <p>{user.name}</p>
                    </td>
                    <td className="py-4">{user.email}</td>
                    <td className="py-4">{user.phoneNumber}</td>
                    <td className="py-4">
                      <p
                        className={`text-white w-fit p-2 rounded-md ${
                          user.isVerified ? "bg-success" : "bg-error"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </p>
                    </td>
                    <td className="hover:cursor-pointer">
                      <FontAwesomeIcon
                        className="hover:text-success"
                        onClick={() => assignNewRole(user.id, "tailor")}
                        icon={faUserPen}
                        title="Assign as tailor"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4">No Users</td>
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
