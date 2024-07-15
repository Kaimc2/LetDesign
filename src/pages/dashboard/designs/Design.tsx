import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { ConfirmDialog } from "../../../core/common/ConfirmDialog";
import { LayoutLoader } from "../../../core/common/Loader";
import { Design } from "../../../types/design.types";

export const DesignPage = () => {
  const { user } = useContext(AuthContext);
  const [designs, setDesigns] = useState<Design[]>();
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesigns = async () => {
      await api
        .get("/designs", {
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
  }, [navigate, user?.accessToken]);

  if (loading) return <LayoutLoader />;

  const deleteDesign = (id: string) => {
    api
      .delete(`/designs/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">My Designs</h1>
        <div className="flex gap-4">
          <Link
            to={"/design"}
            className="flex items-center bg-accent hover:bg-accent-80 px-4 rounded-md shadow-md text-white"
          >
            Create
          </Link>
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
            />
          </div>
        </div>
      </div>

      <div className="p-8 max-w-[calc(100vw-330px)] h-[calc(100vh-120px)] overflow-y-auto flex flex-wrap gap-12">
        {designs?.length ? (
          designs.map((design) => {
            return (
              <div
                key={design.id}
                className="flex flex-col gap-2 hover:cursor-pointer"
              >
                <Link
                  to={`/design/edit/${design.id}`}
                  className="group relative border border-black rounded-md w-[200px] h-[200px] flex items-center justify-center"
                >
                  <img
                    className="p-6"
                    src="/placeholder/pf.png"
                    alt="design_preview"
                  />
                  <FontAwesomeIcon
                    onClick={(e) => {
                      e.preventDefault();
                      setDialogState(true);
                      setDesign(design);
                    }}
                    className="absolute hidden group-hover:block top-2 right-2 hover:text-error"
                    title="Delete"
                    icon={faTrash}
                    size="lg"
                  />
                </Link>
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

      {dialogState && (
        <ConfirmDialog
          name={design?.name ?? "Design Name"}
          blurFn={() => setDialogState(false)}
          confirmFn={() => deleteDesign(design?.id ?? "")}
          cancelFn={() => setDialogState(false)}
        />
      )}
    </div>
  );
};
