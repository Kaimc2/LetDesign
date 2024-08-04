import { faSearch, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { LayoutLoader } from "../../../core/common/Loader";
import { Design } from "../../../types/design.types";
import api from "../../../utils/api";
import { displayNotification } from "../../../utils/helper";

export const DeletedDesign = () => {
  const { user } = useContext(AuthContext);
  const [designs, setDesigns] = useState<Design[]>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesigns = async () => {
      await api
        .get("/designs/deleted", {
          params: { search: search, item_per_page: 18 },
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        })
        .then((res) => {
          setDesigns(res.data.data);
        })
        .catch((err) => {
          if (err.request.status === 403) {
            navigate("/unauthorized");
            setLoading(false);
          }
        });

      setLoading(false);
    };

    fetchDesigns();
  }, [navigate, user?.accessToken, refetch, search]);

  if (loading) return <LayoutLoader />;

  const restoreDesign = (id: string) => {
    api
      .put(`/designs/${id}/restore`)
      .then(() => {
        displayNotification("Design successfully restored", "success");
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Failed to restore design", "error");
      });
  };

  return (
    <div className="md:ml-4">
      <div className="flex flex-col py-2 gap-4 md:py-0 md:gap-0 md:flex-row h-auto md:h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Deleted Designs</h1>
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
      </div>

      <div
        className="p-8 w-full md:max-w-[calc(100vw-330px)] h-auto md:max-h-[calc(100vh-120px)] 
        overflow-y-auto flex flex-wrap gap-12 justify-center md:justify-normal"
      >
        {designs?.length ? (
          designs.map((design) => {
            return (
              <div
                key={design.id}
                className="flex flex-col gap-2 hover:cursor-pointer"
              >
                <div className="group relative border border-black rounded-md w-[200px] h-[200px] flex items-center justify-center">
                  <img
                    className="p-6"
                    src={design.designThumbnail ?? "/placeholder/pf.png"}
                    alt="design_preview"
                  />
                  <FontAwesomeIcon
                    onClick={(e) => {
                      e.preventDefault();
                      restoreDesign(design.id);
                    }}
                    className="absolute hidden group-hover:block top-2 right-2 hover:text-success"
                    title="Restore"
                    icon={faTrashRestore}
                    size="lg"
                  />
                </div>
                <p>{design.name}</p>
                <p className="text-xs text-brand-gray">
                  Edited {design.updatedAt}
                </p>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center text-2xl text-gray-400">
            No Designs
          </div>
        )}
      </div>
    </div>
  );
};
